import Image from 'next/image'

export default function HeroChart() {
    return (
        <div className="relative w-full h-full opacity-0 animate-[chartReveal_1.2s_cubic-bezier(.22,1,.36,1)_.6s_forwards]">
            {/* Contenedor imagen */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/70 border border-red-900/25 group">
                {/* Gradiente inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080102] via-[#080102]/20 to-transparent z-10 pointer-events-none" />
                {/* Gradiente lateral */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#080102]/60 via-transparent to-transparent z-10 pointer-events-none" />

                {/* Imagen flotante */}
                <div className="w-full h-full animate-[floatY_5s_ease-in-out_1.8s_infinite]">
                    <Image
                        src="/arise.png"
                        alt="Coach profesional de League of Legends"
                        fill
                        className="object-contain object-top transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                </div>

                {/* Badge */}
                <div className="absolute bottom-5 left-5 z-20 px-4 py-2.5 rounded-xl flex items-center gap-3 bg-black/50 backdrop-blur-md border border-white/8">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                    <span className="text-[.72rem] font-bold tracking-[2.5px] text-white/90 uppercase font-primary">Coaching Activo</span>
                </div>
            </div>

            {/* Decoraciones */}
            <div className="absolute -top-8 -right-8 w-28 h-28 border border-red-700/20 rounded-full pointer-events-none hidden lg:block animate-[floatY_6s_ease-in-out_0.5s_infinite]" />
            <div className="absolute -bottom-5 -left-5 w-18 h-18 bg-red-900/25 backdrop-blur-md rounded-full pointer-events-none hidden lg:block animate-[floatY_4s_ease-in-out_1.5s_infinite]" />
        </div>
    )
}
