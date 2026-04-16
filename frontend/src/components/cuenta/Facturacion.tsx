"use client";

type InvoiceStatus = "pagada" | "pendiente" | "vencida";

interface Invoice {
    id: string;
    fecha: string;
    plan: string;
    monto: number;
    estado: InvoiceStatus;
}

const INVOICES: Invoice[] = [
    { id: "INV-0041", fecha: "01 Abr 2026", plan: "Coach · Oro · 2h/mes",      monto: 40,  estado: "pagada"   },
    { id: "INV-0038", fecha: "01 Mar 2026", plan: "Coach · Oro · 2h/mes",      monto: 40,  estado: "pagada"   },
    { id: "INV-0035", fecha: "01 Feb 2026", plan: "Coach · Plata · 1h/mes",    monto: 18,  estado: "pagada"   },
    { id: "INV-0032", fecha: "01 Ene 2026", plan: "Coach · Plata · 1h/mes",    monto: 18,  estado: "pagada"   },
    { id: "INV-0029", fecha: "01 Dic 2025", plan: "Boost · Bronce IV → Plata I", monto: 55, estado: "pendiente" },
];

const STATUS_CONFIG: Record<InvoiceStatus, { label: string; bg: string; text: string }> = {
    pagada:    { label: "Pagada",    bg: "bg-emerald-50",  text: "text-emerald-700" },
    pendiente: { label: "Pendiente", bg: "bg-amber-50",    text: "text-amber-700"   },
    vencida:   { label: "Vencida",   bg: "bg-red-50",      text: "text-red-600"     },
};

export default function Facturacion() {
    const totalPagado = INVOICES.filter((i) => i.estado === "pagada").reduce((acc, i) => acc + i.monto, 0);
    const totalPendiente = INVOICES.filter((i) => i.estado === "pendiente").reduce((acc, i) => acc + i.monto, 0);

    return (
        <div className="flex flex-col gap-8">
            {/* Encabezado */}
            <div>
                <h2 className="text-2xl font-bold text-[#1a0f35] tracking-tight mb-1">Facturación</h2>
                <p className="text-sm text-[rgba(30,20,70,.5)]">Historial de pagos y facturas</p>
            </div>

            {/* Resumen */}
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-1">Total pagado</p>
                    <p className="text-3xl font-black text-[#1a0f35]">${totalPagado} <span className="text-sm font-semibold text-[rgba(30,20,70,.4)]">USD</span></p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5">
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-1">Pendiente</p>
                    <p className="text-3xl font-black text-[#1a0f35]">${totalPendiente} <span className="text-sm font-semibold text-[rgba(30,20,70,.4)]">USD</span></p>
                </div>
            </div>

            {/* Tabla de facturas */}
            <div className="rounded-2xl border border-violet-100 bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden">
                {/* Cabecera */}
                <div className="grid grid-cols-[1fr_2fr_80px_100px] gap-4 px-5 py-3 bg-violet-50/80 border-b border-violet-100 text-xs font-semibold text-[rgba(30,20,70,.45)] uppercase tracking-widest">
                    <span>Factura</span>
                    <span>Plan</span>
                    <span className="text-right">Monto</span>
                    <span className="text-right">Estado</span>
                </div>

                {/* Filas */}
                {INVOICES.map((inv, i) => {
                    const cfg = STATUS_CONFIG[inv.estado];
                    return (
                        <div
                            key={inv.id}
                            className={`grid grid-cols-[1fr_2fr_80px_100px] gap-4 px-5 py-4 items-center text-sm ${i < INVOICES.length - 1 ? "border-b border-violet-50" : ""} hover:bg-violet-50/30 transition-colors duration-100`}
                        >
                            <div>
                                <p className="font-semibold text-[#1a0f35] text-xs">{inv.id}</p>
                                <p className="text-[10px] text-[rgba(30,20,70,.4)] mt-0.5">{inv.fecha}</p>
                            </div>
                            <p className="text-[rgba(30,20,70,.7)] text-xs leading-snug">{inv.plan}</p>
                            <p className="text-right font-bold text-[#1a0f35]">${inv.monto}</p>
                            <div className="flex justify-end">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                                    {cfg.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Nota al pie */}
            <p className="text-xs text-[rgba(30,20,70,.35)] text-center">
                Todos los precios en dólares estadounidenses (USD). Para soporte escríbenos al chat.
            </p>
        </div>
    );
}
