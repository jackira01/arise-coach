"use client";

export type Section = "seguimiento" | "chat" | "paquetes" | "facturacion";

interface NavItem {
    id: Section;
    label: string;
    icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
    {
        id: "seguimiento",
        label: "Seguimiento",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
            </svg>
        ),
    },
    {
        id: "chat",
        label: "Chat",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        id: "paquetes",
        label: "Paquetes",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        ),
    },
    {
        id: "facturacion",
        label: "Facturación",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
                <line x1="9" y1="9" x2="11" y2="9" />
            </svg>
        ),
    },
];

interface PanelNavProps {
    active: Section;
    onChange: (section: Section) => void;
}

export default function PanelNav({ active, onChange }: PanelNavProps) {
    return (
        <aside className="w-60 shrink-0 h-fit sticky top-24">
            {/* Avatar / perfil */}
            <div className="flex flex-col items-center gap-3 mb-8 pt-2">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#5a8fd6] to-[#7c3aed] flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_24px_rgba(124,58,237,.35)]">
                    J
                </div>
                <div className="text-center">
                    <p className="font-semibold text-[#1a0f35] text-sm tracking-wide">jugaidor123</p>
                    <p className="text-xs text-[rgba(30,20,70,.45)] tracking-wide">Plan Oro · Activo</p>
                </div>
            </div>

            {/* Navegación */}
            <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ id, label, icon }) => {
                    const isActive = active === id;
                    return (
                        <button
                            key={id}
                            onClick={() => onChange(id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 w-full text-left cursor-pointer
                                ${isActive
                                    ? "bg-violet-700 text-white shadow-[0_4px_16px_rgba(109,40,217,.35)]"
                                    : "text-[rgba(30,20,70,.6)] hover:bg-violet-50 hover:text-violet-700"
                                }`}
                        >
                            <span className={isActive ? "text-white" : "text-[rgba(30,20,70,.4)]"}>{icon}</span>
                            {label}
                        </button>
                    );
                })}
            </nav>

            {/* Indicador de sesión */}
            <div className="mt-8 p-4 rounded-xl border border-violet-100 bg-violet-50/60">
                <p className="text-xs font-semibold text-violet-700 uppercase tracking-widest mb-1">Próxima sesión</p>
                <p className="text-sm text-[#1a0f35] font-medium">Lunes 14 Abr</p>
                <p className="text-xs text-[rgba(30,20,70,.5)]">20:00 · 1 hora · Micro game</p>
            </div>
        </aside>
    );
}
