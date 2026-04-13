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

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Pagado', value: '$1,500 USD', color: 'text-green-400' },
                    { label: 'Pendiente', value: '$500 USD', color: 'text-amber-400' },
                    { label: 'Facturas Totales', value: '5', color: 'text-red-400' },
                ].map((s) => (
                    <div key={s.label} className="bg-red-950/30 backdrop-blur-sm border border-red-800/20 rounded-2xl p-5 text-center">
                        <p className={`font-primary text-[1.6rem] font-black leading-none mb-1 ${s.color}`}>{s.value}</p>
                        <p className="font-primary text-[.72rem] uppercase tracking-[2px] text-[rgba(255,210,210,.5)]">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-red-950/20 backdrop-blur-sm border border-red-800/20 rounded-2xl overflow-hidden">
                {/* Table header */}
                <div className="hidden sm:grid grid-cols-[1fr_2fr_2fr_1.2fr_1fr] gap-4 px-6 py-3 border-b border-red-800/20 bg-red-950/30">
                    {['ID', 'Fecha', 'Descripción', 'Monto', 'Estado'].map((h) => (
                        <span key={h} className="font-primary text-[.68rem] uppercase tracking-[2px] text-[rgba(255,210,210,.4)]">{h}</span>
                    ))}
                </div>

                {/* Rows */}
                {INVOICES.map((inv, i) => (
                    <div
                        key={inv.id}
                        className={`grid grid-cols-1 sm:grid-cols-[1fr_2fr_2fr_1.2fr_1fr] gap-2 sm:gap-4 px-6 py-4 transition-colors hover:bg-red-950/20 ${i < INVOICES.length - 1 ? 'border-b border-red-800/15' : ''
                            }`}
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
