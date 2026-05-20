import './globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'

export const metadata = {
  title: 'Tiago Laureano | Developer',
  description: 'Portfólio de Tiago Laureano',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}