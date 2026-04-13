const PLANS = [
    {
        name: 'Silver Pack',
        price: '200 USD',
        highlight: false,
        current: false,
        rankImg: '/ranks/silver.webp',
        rankGlow: '#90a4ae',
        detail1: '8 hrs / semana',
        detail2: '5 games',
        detail3: '6 – 8 temas',
        stripeUrl: 'https://buy.stripe.com/dRmeVeguB3Dv1XUcLV1Nu01',
        features: ['Retroalimentación personalizada', 'Coach en vivo'],
    },
    {
        name: 'Esmerald Pack',
        price: '300 USD',
        highlight: false,
        current: false,
        rankImg: '/ranks/emerald.png',
        rankGlow: '#3dba6a',
        detail1: '12 hrs / semana',
        detail2: '10 games',
        detail3: '8 – 10 temas',
        stripeUrl: 'https://buy.stripe.com/bJe6oI5PX5LDeKG27h1Nu02',
        features: ['Retroalimentación personalizada', 'Coach en vivo', 'Entrenamiento personalizado', 'Análisis previo'],
    },
    {
        name: 'Diamond Pack',
        price: '500 USD',
        highlight: true,
        current: true,
        rankImg: '/ranks/diamond.png',
        rankGlow: '#4a9ee0',
        detail1: '18 hrs / semana',
        detail2: '15 games',
        detail3: '9 – 10 temas',
        stripeUrl: 'https://buy.stripe.com/00w5kEa6dde5auq13d1Nu03',
        features: ['Retroalimentación personalizada', 'Coach en vivo', 'Entrenamiento personalizado', 'Análisis previo', 'Videos personalizados de mejoras', 'Teorías aplicadas al juego'],
    },
    {
        name: 'Chall Pack',
        price: '800 USD',
        highlight: false,
        current: false,
        rankImg: '/ranks/challenger.png',
        rankGlow: '#ffd600',
        detail1: '32 hrs / semana',
        detail2: '20 games',
        detail3: '12 – 14 temas',
        stripeUrl: 'https://buy.stripe.com/fZucN6celgqhcCydPZ1Nu00',
        features: ['Retroalimentación personalizada', 'Coach en vivo', 'Entrenamiento personalizado', 'Análisis previo', 'Videos personalizados de mejoras', 'Teorías aplicadas al juego', 'Práctica guiada', 'Entendimiento analítico pre y post game'],
    },
]

export default function PaquetesPanel() {
    const currentPlan = PLANS.find((p) => p.current)

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 font-primary text-[.7rem] tracking-[4px] uppercase text-red-500 mb-2">
                    <span className="w-5 h-px bg-red-500 inline-block" />
                    Paquetes
                </div>
                <h2 className="font-serif text-2xl font-bold uppercase text-[#fff0f0]">Planes Disponibles</h2>
                <p className="font-primary text-[.88rem] text-[rgba(255,210,210,.5)] mt-1">
                    Tu plan actual está resaltado. Puedes cambiar o hacer upgrade en cualquier momento.
                </p>
            </div>

            {/* Current plan summary banner */}
            {currentPlan && (
                <div className="bg-red-950/40 backdrop-blur-sm border border-red-700/30 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={currentPlan.rankImg} alt={currentPlan.name} className="w-12 h-12 object-contain shrink-0"
                        style={{ filter: `drop-shadow(0 0 10px ${currentPlan.rankGlow}88)` }} />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-serif text-[1.1rem] font-bold uppercase text-white">{currentPlan.name}</span>
                            <span className="font-primary text-[.6rem] font-black tracking-[3px] uppercase px-3 py-0.5 rounded-full bg-linear-to-r from-cyan-500/80 to-blue-500/80 text-white">Plan Activo</span>
                        </div>
                        <div className="flex gap-5 mt-2 flex-wrap">
                            {[currentPlan.detail1, currentPlan.detail2, currentPlan.detail3].map((d) => (
                                <span key={d} className="font-primary text-[.78rem] text-[rgba(255,210,210,.6)]">{d}</span>
                            ))}
                        </div>
                    </div>
                    <span className="font-primary text-[1.8rem] font-black text-white shrink-0">{currentPlan.price}<span className="text-[.7rem] font-normal text-white/50 ml-1">/mes</span></span>
                </div>
            )}

            {/* Plan cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {PLANS.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative flex flex-col rounded-2xl p-5 border transition-all duration-300 ${plan.current
                            ? 'bg-linear-to-br from-red-800/90 to-red-700/80 border-red-500/40 shadow-[0_0_40px_rgba(180,20,20,.4)]'
                            : 'bg-red-950/25 backdrop-blur-sm border-red-800/20 hover:border-red-700/40 hover:bg-red-950/35'
                        }`}
                    >
                        {plan.current && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-primary text-[.55rem] font-black tracking-[3px] uppercase px-3 py-0.5 rounded-full bg-linear-to-r from-cyan-400 to-blue-400 text-white shadow-lg whitespace-nowrap">
                                TU PLAN ACTUAL
                            </div>
                        )}

                        {/* Rank image */}
                        <div className="flex justify-center mb-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={plan.rankImg} alt={plan.name} className="w-12 h-12 object-contain"
                                style={{ filter: `drop-shadow(0 0 10px ${plan.rankGlow}77)` }} />
                        </div>

                        {/* Name + price */}
                        <h3 className={`font-serif text-[1.05rem] font-bold uppercase text-center leading-tight mb-1 ${plan.current ? 'text-white' : 'text-[#fff0f0]'}`}>
                            {plan.name}
                        </h3>
                        <p className={`font-primary text-[1.5rem] font-black text-center leading-none mb-4 ${plan.current ? 'text-white' : 'text-[#fff0f0]'}`}>
                            {plan.price}<span className={`text-[.65rem] font-normal ml-1 ${plan.current ? 'text-white/50' : 'text-[rgba(255,210,210,.4)]'}`}>/mes</span>
                        </p>

                        {/* Details row */}
                        <div className={`flex flex-col gap-1 mb-4 pb-4 border-b ${plan.current ? 'border-white/15' : 'border-red-800/20'}`}>
                            {[
                                { icon: '⏱', val: plan.detail1 },
                                { icon: '🎮', val: plan.detail2 },
                                { icon: '📚', val: plan.detail3 },
                            ].map((d) => (
                                <div key={d.val} className={`flex items-center gap-2 font-primary text-[.75rem] ${plan.current ? 'text-red-100' : 'text-[rgba(255,210,210,.7)]'}`}>
                                    <span>{d.icon}</span> {d.val}
                                </div>
                            ))}
                        </div>

                        {/* Features */}
                        <ul className="flex flex-col gap-1.5 mb-5 flex-1">
                            {plan.features.map((f) => (
                                <li key={f} className={`flex items-start gap-2 font-primary text-[.72rem] ${plan.current ? 'text-white/80' : 'text-[rgba(255,210,210,.6)]'}`}>
                                    <svg className={`w-3.5 h-3.5 shrink-0 mt-[1px] ${plan.current ? 'text-cyan-300' : 'text-red-400'}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        {plan.current ? (
                            <div className="w-full py-2.5 bg-white/15 text-white font-primary text-[.75rem] font-bold tracking-[2px] uppercase rounded-xl text-center border border-white/20">
                                ✓ Plan Activo
                            </div>
                        ) : (
                            <a
                                href={plan.stripeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 bg-linear-to-br from-red-700 to-red-500 text-white font-primary text-[.75rem] font-bold tracking-[2px] uppercase rounded-xl text-center block hover:brightness-110 transition-all duration-200"
                            >
                                Cambiar Plan
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
