import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'

export const metadata: Metadata = {
    title: 'Arise Coach — League of Legends Coaching',
    description: 'Coaching profesional de League of Legends con coaches Challenger. Mejora tus mecánicas, visión de juego y mentalidad.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Domine:wght@400..700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-[#080102] text-[#fff0f0] font-primary min-h-screen">
                <LenisProvider>
                    {children}
                </LenisProvider>
            </body>
        </html>
    )
}
