import './globals.css'
import ClientApp from './ClientApp.jsx'

export const metadata = {
  title: 'DuraMater',
  description: 'Proactive health testing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientApp>{children}</ClientApp>
      </body>
    </html>
  )
}
