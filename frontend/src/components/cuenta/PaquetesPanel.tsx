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
    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 font-primary text-[.7rem] tracking-[4px] uppercase text-red-500 mb-2">
                    <span className="w-5 h-px bg-red-500 inline-block" />
                    Paquetes
                </div>
                <h2 className="font-serif text-2xl font-bold uppercase text-[#fff0f0]">
                    Planes Disponibles
                </h2>
                <p className="font-primary text-[.88rem] text-[rgba(255,210,210,.5)] mt-1">
                    Tu plan actual está resaltado. Puedes cambiar o upgrade en cualquier momento.
                </p>
            </div>

            {/* Plan cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {PLANS.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative flex flex-col rounded-2xl p-6 border transition-all duration-300 ${plan.current
                                ? 'bg-linear-to-br from-red-800 to-red-600 border-red-500/40 shadow-[0_0_50px_rgba(180,20,20,.45)] scale-[1.02]'
                                : 'bg-red-950/30 backdrop-blur-sm border-red-800/20'
                            }`}
                    >
                        {plan.current && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-primary text-[.58rem] font-black tracking-[3px] uppercase px-4 py-1 rounded-full bg-linear-to-r from-cyan-400 to-blue-400 text-white shadow-lg whitespace-nowrap">
                                TU PLAN ACTUAL
                            </div>
                        )}

                        <div className="flex justify-center mb-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={plan.rankImg}
                                alt={plan.name}
                                className="w-14 h-14 object-contain"
                                style={{ filter: `drop-shadow(0 0 12px ${plan.rankGlow}88)` }}
                            />
                        </div>

                        <h3 className={`font-serif text-[1.2rem] font-bold uppercase text-center leading-tight mb-4 ${plan.current ? 'text-white' : 'text-[#fff0f0]'}`}>
                            {plan.name}
                        </h3>

                        <div className={`flex flex-col gap-1.5 mb-4 ${plan.current ? 'text-red-100' : 'text-[rgba(255,210,210,.8)]'}`}>
                            <div className="flex items-center gap-2 font-primary text-[.8rem]"><span>⏱</span> {plan.detail1}</div>
                            <div className="flex items-center gap-2 font-primary text-[.8rem]"><span>🎮</span> {plan.detail2}</div>
                            <div className="flex items-center gap-2 font-primary text-[.8rem]"><span>📚</span> {plan.detail3}</div>
                        </div>

                        <div className={`h-px mb-4 ${plan.current ? 'bg-white/20' : 'bg-red-800/25'}`} />

                        <div className="text-center mb-4">
                            <span className={`font-primary text-[1.8rem] font-black ${plan.current ? 'text-white' : 'text-[#fff0f0]'}`}>{plan.price}</span>
                        </div>

                        <ul className="flex flex-col gap-1.5 mb-5 flex-1">
                            {plan.features.map((f) => (
                                <li key={f} className={`flex items-start gap-2 font-primary text-[.75rem] ${plan.current ? 'text-white/80' : 'text-[rgba(255,210,210,.65)]'}`}>
                                    <svg className={`w-3.5 h-3.5 shrink-0 mt-[1px] ${plan.current ? 'text-white/70' : 'text-red-400'}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        {plan.current ? (
                            <div className="w-full py-2.5 bg-white/15 text-white font-primary text-[.78rem] font-bold tracking-[2px] uppercase rounded-xl text-center border border-white/20">
                                ✓ Plan Activo
                            </div>
                        ) : (
                            <a
                                href={plan.stripeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 bg-linear-to-br from-red-700 to-red-500 text-white font-primary text-[.78rem] font-bold tracking-[2px] uppercase rounded-xl text-center block hover:brightness-110 transition-all duration-250"
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
