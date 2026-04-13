'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (res?.error) {
            setError('Email o contraseña incorrectos.')
        } else {
            router.push('/cuenta')
        }
    }

    return (
        <>
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(160,10,10,.4) 0%, transparent 65%)' }}
            />
            <main className="relative z-10 min-h-screen flex items-center justify-center px-5 py-20">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 font-primary text-[.78rem] tracking-[4px] uppercase text-red-500 mb-3">
                            <span className="w-7 h-px bg-red-500 inline-block" />
                            Acceso
                            <span className="w-7 h-px bg-red-500 inline-block" />
                        </div>
                        <h1 className="font-serif text-3xl font-bold uppercase text-[#fff0f0]">
                            Inicia{' '}
                            <span className="bg-linear-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">Sesión</span>
                        </h1>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl p-8 flex flex-col gap-5"
                    >
                        <div className="flex flex-col gap-2">
                            <label className="font-primary text-[.78rem] uppercase tracking-[2px] text-[rgba(255,210,210,.6)]">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-black/30 border border-red-800/25 rounded-xl px-4 py-3 font-primary text-[.9rem] text-[#fff0f0] placeholder-[rgba(255,210,210,.3)] focus:outline-none focus:border-red-600/60 transition-colors"
                                placeholder="tu@email.com"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-primary text-[.78rem] uppercase tracking-[2px] text-[rgba(255,210,210,.6)]">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-black/30 border border-red-800/25 rounded-xl px-4 py-3 font-primary text-[.9rem] text-[#fff0f0] placeholder-[rgba(255,210,210,.3)] focus:outline-none focus:border-red-600/60 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="font-primary text-[.82rem] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-linear-to-br from-red-700 to-red-500 text-white font-primary text-[.87rem] font-bold tracking-[2px] uppercase rounded-xl hover:brightness-110 transition-all duration-250 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <Link href="/" className="font-primary text-[.82rem] tracking-[2px] uppercase text-[rgba(255,210,210,.45)] hover:text-red-400 transition-colors duration-200">
                            ← Volver al inicio
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
