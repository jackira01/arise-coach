import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import CuentaClient from '@/components/cuenta/CuentaClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mi Cuenta — Arise Coach',
}

export default async function CuentaPage() {
    const session = await auth()
    if (!session) redirect('/login')

    return <CuentaClient />
}
