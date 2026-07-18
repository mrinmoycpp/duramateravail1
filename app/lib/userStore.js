import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const IS_VERCEL = process.env.VERCEL === '1'

const DATA_DIR = path.join(process.cwd(), 'server', 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')
const HASH_ITERATIONS = 120000
const HASH_LENGTH = 32
const HASH_DIGEST = 'sha256'

// In-memory store for Vercel (persists across requests in same instance)
const memKey = '__duramater_users__'
if (!globalThis[memKey]) globalThis[memKey] = null
const getUsersMem = () => {
  if (globalThis[memKey] === null) globalThis[memKey] = []
  return globalThis[memKey]
}

if (!IS_VERCEL) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }) } catch {}
}

function readUsers() {
  if (IS_VERCEL) return getUsersMem()
  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'))
    return Array.isArray(users) ? users : []
  } catch {
    return []
  }
}

function writeUsers(users) {
  if (IS_VERCEL) {
    globalThis[memKey] = users
    return
  }
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto
    .pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_LENGTH, HASH_DIGEST)
    .toString('hex')
  return `${HASH_ITERATIONS}:${salt}:${hash}`
}

function verifyPassword(password, storedHash) {
  const [iterations, salt, hash] = String(storedHash || '').split(':')
  if (!iterations || !salt || !hash) return false
  const candidate = crypto
    .pbkdf2Sync(password, salt, Number(iterations), HASH_LENGTH, HASH_DIGEST)
    .toString('hex')
  const expected = Buffer.from(hash, 'hex')
  const actual = Buffer.from(candidate, 'hex')
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual)
}

export function createUser({ email, password, name }) {
  const normalizedEmail = normalizeEmail(email)
  const users = readUsers()
  if (users.some((user) => user.email === normalizedEmail)) {
    return { error: 'An account with this email already exists.' }
  }
  const user = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    name: String(name || '').trim() || normalizedEmail.split('@')[0],
    passwordHash: hashPassword(password),
    provider: 'email',
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  writeUsers(users)
  return { user: publicUser(user) }
}

export function findUserByCredentials(email, password) {
  const normalizedEmail = normalizeEmail(email)
  const user = readUsers().find((item) => item.email === normalizedEmail)
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null
  }
  return publicUser(user)
}

export function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    provider: user.provider,
  }
}
