'use client'

import { useState } from 'react'
import SeguimientoPanel from '@/components/cuenta/SeguimientoPanel'
import ChatPanel from '@/components/cuenta/ChatPanel'
import FacturacionPanel from '@/components/cuenta/FacturacionPanel'
import PaquetesPanel from '@/components/cuenta/PaquetesPanel'
import { signOut } from 'next-auth/react'

type Tab = 'seguimiento' | 'chat' | 'facturacion' | 'paquetes'

const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'seguimiento', label: 'Seguimiento', icon: '📈' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'facturacion', label: 'Facturación', icon: '🧾' },
    { id: 'paquetes', label: 'Paquetes', icon: '📦' },
]

export default function CuentaClient() {
    const [activeTab, setActiveTab] = useState<Tab>('seguimiento')

    return (
        <div className="min-h-screen bg-[#080102] text-[#fff0f0]">
            {/* Background */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 20%, rgba(120,5,5,.45) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(80,0,0,.3) 0%, transparent 65%)' }}
            />

            {/* Header del panel */}
            <header className="relative z-10 border-b border-red-800/20 bg-[#080102]/90 backdrop-blur-[12px] sticky top-0">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo.png" alt="AriseXR" className="h-8 w-auto" />
                        <span className="font-primary text-[.78rem] uppercase tracking-[3px] text-[rgba(255,210,210,.4)]">Panel</span>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="font-primary text-[.78rem] uppercase tracking-[2px] text-[rgba(255,210,210,.4)] hover:text-red-400 transition-colors duration-200"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col lg:flex-row gap-8">

                {/* Sidebar / Tab nav */}
                <aside className="lg:w-56 shrink-0">
                    <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-primary text-[.85rem] font-semibold tracking-[1px] transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-red-700/80 text-white shadow-[0_0_20px_rgba(180,20,20,.35)]'
                                        : 'text-[rgba(255,210,210,.6)] hover:bg-red-950/40 hover:text-[#fff0f0]'
                                    }`}
                            >
                                <span className="text-base">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Panel content */}
                <main className="flex-1 min-w-0">
                    {activeTab === 'seguimiento' && <SeguimientoPanel />}
                    {activeTab === 'chat' && <ChatPanel />}
                    {activeTab === 'facturacion' && <FacturacionPanel />}
                    {activeTab === 'paquetes' && <PaquetesPanel />}
                </main>
            </div>
        </div>
    )
}
