import './globals.css'

import { ThemeProvider } from '@/context/ThemeProvider'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  metadataBase: new URL(
    'https://tiagonl.dev.br'
  ),

  title:
    'Tiago Laureano | Developer',

  description:
    `Tecnólogo em Análise e Desenvolvimento de Sistemas pela FATEC Rio Preto.

Focado em desenvolvimento web, automações e aplicações em tempo real.`,

  applicationName:
    'Tiago Laureano Portfolio',

  keywords: [
    'Tiago Laureano',
    'TiagoNL',
    'Developer',
    'Desenvolvedor Full Stack',
    'Next.js',
    'Node.js',
    'React',
    'Portfólio',
    'Programador',
    'JavaScript',
  ],

  authors: [
    {
      name: 'Tiago Laureano',
      url: 'https://tiagonl.dev.br',
    },
  ],

  creator: 'Tiago Laureano',

  openGraph: {
    type: 'website',

    locale: 'pt_BR',

    url: 'https://tiagonl.dev.br',

    title:
      'Tiago Laureano | Developer',

    description:
      `Tecnólogo em Análise e Desenvolvimento de Sistemas pela FATEC Rio Preto.

Focado em desenvolvimento web, automações e aplicações em tempo real.`,

    siteName: 'Tiago Laureano',

    images: [
      {
        url: '/img/icon_tiagonl.png',

        width: 1200,

        height: 630,

        alt: 'Tiago Laureano',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'Tiago Laureano | Developer',

    description:
      `Tecnólogo em Análise e Desenvolvimento de Sistemas pela FATEC Rio Preto.

Focado em desenvolvimento web, automações e aplicações em tempo real.`,

    images: [
      '/img/icon_tiagonl.png',
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/img/icon_tiagonl.ico",

    shortcut: "/img/icon_tiagonl.ico",

    apple: "/img/icon_tiagonl.ico",
  },
}

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}