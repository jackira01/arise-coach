type InvoiceStatus = 'Pagado' | 'Pendiente' | 'Procesando'

interface Invoice {
    id: string
    date: string
    description: string
    amount: string
    status: InvoiceStatus
}

const INVOICES: Invoice[] = [
    { id: 'INV-001', date: '01 Abr 2026', description: 'Diamond Pack — Abril 2026', amount: '$500.00 USD', status: 'Pagado' },
    { id: 'INV-002', date: '01 Mar 2026', description: 'Diamond Pack — Marzo 2026', amount: '$500.00 USD', status: 'Pagado' },
    { id: 'INV-003', date: '01 Feb 2026', description: 'Esmerald Pack — Febrero 2026', amount: '$300.00 USD', status: 'Pagado' },
    { id: 'INV-004', date: '01 Ene 2026', description: 'Silver Pack — Enero 2026', amount: '$200.00 USD', status: 'Pagado' },
    { id: 'INV-005', date: '13 Abr 2026', description: 'Diamond Pack — Mayo 2026', amount: '$500.00 USD', status: 'Pendiente' },
]

const STATUS_CLS: Record<InvoiceStatus, string> = {
    Pagado: 'text-green-400 bg-green-500/10 border-green-500/25',
    Pendiente: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
    Procesando: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
}

export default function FacturacionPanel() {
    const totalPaid = INVOICES.filter((i) => i.status === 'Pagado').reduce((acc, i) => acc + parseFloat(i.amount.replace(/[^0-9.]/g, '')), 0)
    const totalPending = INVOICES.filter((i) => i.status === 'Pendiente').reduce((acc, i) => acc + parseFloat(i.amount.replace(/[^0-9.]/g, '')), 0)

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 font-primary text-[.7rem] tracking-[4px] uppercase text-red-500 mb-2">
                    <span className="w-5 h-px bg-red-500 inline-block" />
                    Facturación
                </div>
                <h2 className="font-serif text-2xl font-bold uppercase text-[#fff0f0]">Tus Facturas</h2>
            </div>

            {/* Top row: summary stats + last payment highlight */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Stats — 2 cols */}
                <div className="lg:col-span-2 grid grid-cols-3 gap-4">
                    {[
                        { label: 'Total Pagado', value: `$${totalPaid.toLocaleString()} USD`, color: 'text-green-400', icon: '✓' },
                        { label: 'Pendiente', value: `$${totalPending.toLocaleString()} USD`, color: 'text-amber-400', icon: '⏳' },
                        { label: 'Facturas Totales', value: `${INVOICES.length}`, color: 'text-red-400', icon: '🧾' },
                    ].map((s) => (
                        <div key={s.label} className="bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-1">
                            <span className="text-xl mb-1">{s.icon}</span>
                            <p className={`font-primary text-[1.5rem] font-black leading-none ${s.color}`}>{s.value}</p>
                            <p className="font-primary text-[.68rem] uppercase tracking-[2px] text-[rgba(255,210,210,.45)] mt-0.5">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Next payment card */}
                {(() => {
                    const next = INVOICES.find((i) => i.status === 'Pendiente')
                    if (!next) return null
                    return (
                        <div className="bg-amber-950/25 backdrop-blur-sm border border-amber-700/25 rounded-2xl p-5 flex flex-col justify-between">
                            <div>
                                <span className="font-primary text-[.65rem] uppercase tracking-[3px] text-amber-500/80">Próximo Cobro</span>
                                <p className="font-primary text-[1.6rem] font-black text-amber-400 leading-none mt-2">{next.amount}</p>
                                <p className="font-primary text-[.78rem] text-[rgba(255,210,210,.6)] mt-1">{next.description}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                                <span className="font-primary text-[.72rem] text-amber-400/80">{next.date}</span>
                            </div>
                        </div>
                    )
                })()}
            </div>

            {/* Invoice table */}
            <div className="bg-red-950/20 backdrop-blur-sm border border-red-800/20 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-red-800/20 bg-red-950/30">
                    <span className="font-primary text-[.82rem] font-semibold text-[rgba(255,210,210,.8)]">Historial de Facturas</span>
                </div>
                {/* Table header */}
                <div className="hidden sm:grid grid-cols-[1fr_2fr_2fr_1.2fr_1fr] gap-4 px-6 py-3 border-b border-red-800/20 bg-red-950/20">
                    {['ID', 'Fecha', 'Descripción', 'Monto', 'Estado'].map((h) => (
                        <span key={h} className="font-primary text-[.65rem] uppercase tracking-[2px] text-[rgba(255,210,210,.35)]">{h}</span>
                    ))}
                </div>

                {/* Rows */}
                {INVOICES.map((inv, i) => (
                    <div
                        key={inv.id}
                        className={`grid grid-cols-1 sm:grid-cols-[1fr_2fr_2fr_1.2fr_1fr] gap-2 sm:gap-4 px-6 py-4 transition-colors hover:bg-red-950/20 ${i < INVOICES.length - 1 ? 'border-b border-red-800/15' : ''}`}
                    >
                        <span className="font-primary text-[.78rem] font-bold text-[rgba(255,210,210,.5)]">{inv.id}</span>
                        <span className="font-primary text-[.82rem] text-[rgba(255,210,210,.7)]">{inv.date}</span>
                        <span className="font-primary text-[.82rem] text-[#fff0f0]">{inv.description}</span>
                        <span className="font-primary text-[.88rem] font-bold text-[#fff0f0]">{inv.amount}</span>
                        <span className={`self-start font-primary text-[.68rem] font-bold uppercase tracking-[1.5px] px-2.5 py-1 rounded-full border ${STATUS_CLS[inv.status]}`}>
                            {inv.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
