// run.js - Pre-start script for Next.js dev server
process.env.HOME = "/Users/pushkarmondal/duramater_code/Duramater-NextJS";
process.env.AWS_SHARED_CREDENTIALS_FILE = "/dev/null";
process.env.AWS_CONFIG_FILE = "/dev/null";
process.env.NEXT_TELEMETRY_DISABLED = "1";

const { spawn } = require("child_process");
const path = require("path");

// Use node (not bun) to launch next so the subprocess inherits the same unsandboxed binary
const nextBin = path.join(__dirname, "node_modules", "next", "dist", "bin", "next");
const nodeBin = process.execPath; // path of the currently running node binary

console.log("[run.js] Spawning Next.js dev server via node at:", nextBin);
console.log("[run.js] Node binary:", nodeBin);

const child = spawn(nodeBin, [nextBin, "dev"], {
  stdio: "inherit",
  env: {
    ...process.env,
    PORT: "3000",
    NEXT_TELEMETRY_DISABLED: "1",
  },
});

child.on("error", (err) => {
  console.error("[run.js] Failed to start child:", err);
  process.exit(1);
});

child.on("close", (code) => {
  console.log("[run.js] Next.js dev server closed with code:", code);
  process.exit(code);
});
