'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
    id: number
    from: 'coach' | 'student'
    text: string
    time: string
}

const INITIAL_MESSAGES: Message[] = [
    { id: 1, from: 'coach', text: '¡Hola! Bienvenido a tus sesiones de coaching. ¿Cómo te fue en la partida de ayer?', time: '10:02' },
    { id: 2, from: 'student', text: 'Bien, pero sentí que en el teamfight del barón tomé una mala posición y nos costó el juego.', time: '10:05' },
    { id: 3, from: 'coach', text: 'Exacto, lo noté también. Necesitas quedarte más cerca de la línea de retiro. Cuando el tanque avanza, tú debes mantener distancia de 600 unidades. ¿Lo practicaste en custom?', time: '10:07' },
    { id: 4, from: 'student', text: 'Todavía no, ¿cómo lo puedo entrenar?', time: '10:09' },
    { id: 5, from: 'coach', text: 'Crea una partida custom con un amigo que juegue tank. Que él avance y tú practica kitear hacia atrás mientras atacas. 15 minutos diarios y lo tendrás en una semana. 🛡️', time: '10:11' },
    { id: 6, from: 'student', text: '¡Perfecto, lo haré esta noche!', time: '10:12' },
    { id: 7, from: 'coach', text: 'Excelente actitud. Para nuestra próxima sesión revisa los replays de tus últimas 3 derrotas y anota en qué minuto perdiste el control del mapa. Así preparamos el siguiente tema.', time: '10:14' },
]

export default function ChatPanel() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    function sendMessage(e: React.FormEvent) {
        e.preventDefault()
        const text = input.trim()
        if (!text) return

        const now = new Date()
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

        setMessages((prev) => [...prev, { id: Date.now(), from: 'student', text, time }])
        setInput('')

        // Simulated coach reply
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    from: 'coach',
                    text: '¡Recibido! Lo tengo en cuenta para la próxima sesión. Sigue practicando. 💪',
                    time: `${now.getHours().toString().padStart(2, '0')}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`,
                },
            ])
        }, 1500)
    }

    return (
        <div className="flex flex-col gap-5 h-full">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 font-primary text-[.7rem] tracking-[4px] uppercase text-red-500 mb-2">
                    <span className="w-5 h-px bg-red-500 inline-block" />
                    Chat
                </div>
                <h2 className="font-serif text-2xl font-bold uppercase text-[#fff0f0]">Chat con tu Coach</h2>
            </div>

            {/* Chat container */}
            <div className="bg-red-950/20 backdrop-blur-sm border border-red-800/20 rounded-2xl flex flex-col overflow-hidden" style={{ height: '540px' }}>
                {/* Coach info bar */}
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-red-800/20 bg-red-950/30">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-red-700 to-red-500 flex items-center justify-center text-white font-bold text-sm font-primary shrink-0">
                        C
                    </div>
                    <div>
                        <p className="font-primary text-[.88rem] font-semibold text-[#fff0f0]">AriseXR</p>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="font-primary text-[.68rem] text-green-400 uppercase tracking-[1.5px]">En línea</span>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 scroll-smooth">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-2.5 ${msg.from === 'student' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold font-primary ${msg.from === 'coach'
                                    ? 'bg-linear-to-br from-red-700 to-red-500 text-white'
                                    : 'bg-red-950/50 border border-red-800/30 text-[rgba(255,210,210,.7)]'
                                }`}>
                                {msg.from === 'coach' ? 'C' : 'T'}
                            </div>
                            {/* Bubble */}
                            <div className={`max-w-[72%] flex flex-col gap-1 ${msg.from === 'student' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-4 py-2.5 rounded-2xl font-primary text-[.85rem] leading-relaxed ${msg.from === 'coach'
                                        ? 'bg-red-950/60 border border-red-800/25 text-[rgba(255,210,210,.9)] rounded-tl-sm'
                                        : 'bg-red-700/70 text-white rounded-tr-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                                <span className="font-primary text-[.65rem] text-[rgba(255,210,210,.35)]">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <form onSubmit={sendMessage} className="flex items-center gap-3 px-4 py-3 border-t border-red-800/20 bg-red-950/30">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 bg-black/30 border border-red-800/25 rounded-xl px-4 py-2.5 font-primary text-[.88rem] text-[#fff0f0] placeholder-[rgba(255,210,210,.3)] focus:outline-none focus:border-red-600/60 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="w-10 h-10 rounded-xl bg-linear-to-br from-red-700 to-red-500 flex items-center justify-center text-white transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    >
                        <svg className="w-4 h-4 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}
