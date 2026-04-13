"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
    id: number;
    from: "coach" | "user";
    text: string;
    time: string;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: 1,
        from: "coach",
        text: "¡Hola! Revisé tu partida de ayer en Gold II. Tu CS estuvo bien, pero noté que perdiste dos oleadas buenas en el minuto 8.",
        time: "10:02",
    },
    {
        id: 2,
        from: "user",
        text: "Sí, creo que me distraje mirando el mapa cuando el Jungla hizo gank midlane.",
        time: "10:04",
    },
    {
        id: 3,
        from: "coach",
        text: "Exacto. El truco es congelar ANTES de mirar el mapa para preservar la oleada. Te mando un clip de cómo lo hacen los Challengers.",
        time: "10:05",
    },
    {
        id: 4,
        from: "user",
        text: "Súper, tiene mucho sentido. ¿Lo trabajamos en la sesión del lunes?",
        time: "10:07",
    },
    {
        id: 5,
        from: "coach",
        text: "Perfecto, lo incluyo en el plan. También vamos a repasar posicionamiento en peleas de equipo porque vi que entraste un par de veces muy adelantado.",
        time: "10:08",
    },
];

function formatTime(date: Date) {
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        const text = input.trim();
        if (!text) return;
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), from: "user", text, time: formatTime(new Date()) },
        ]);
        setInput("");
    };

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col gap-0 h-full">
            {/* Encabezado */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#1a0f35] tracking-tight mb-1">Chat</h2>
                <p className="text-sm text-[rgba(30,20,70,.5)]">Mensajes con tu coach</p>
            </div>

            {/* Contenedor del chat */}
            <div className="rounded-2xl border border-violet-100 bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col" style={{ height: "560px" }}>
                {/* Barra superior del chat */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-violet-100 bg-white/80 shrink-0">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-violet-600 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        K
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#1a0f35]">Kaito · Coach</p>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,.6)]" />
                            <span className="text-xs text-[rgba(30,20,70,.45)]">En línea</span>
                        </div>
                    </div>
                </div>

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 scroll-smooth">
                    {messages.map((msg) => {
                        const isUser = msg.from === "user";
                        return (
                            <div key={msg.id} className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
                                {/* Avatar */}
                                {!isUser && (
                                    <div className="w-7 h-7 shrink-0 rounded-full bg-linear-to-br from-violet-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                                        K
                                    </div>
                                )}

                                {/* Burbuja */}
                                <div
                                    className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                                        ${isUser
                                            ? "bg-violet-700 text-white rounded-br-sm"
                                            : "bg-white border border-violet-100 text-[#1a0f35] rounded-bl-sm shadow-sm"
                                        }`}
                                >
                                    {msg.text}
                                    <span className={`block text-right text-[10px] mt-1 ${isUser ? "text-violet-200" : "text-[rgba(30,20,70,.35)]"}`}>
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="shrink-0 border-t border-violet-100 bg-white/90 px-4 py-3 flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 text-sm bg-violet-50/60 border border-violet-100 rounded-xl px-4 py-2.5 text-[#1a0f35] placeholder:text-[rgba(30,20,70,.35)] outline-none focus:border-violet-400 transition-colors duration-150"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim()}
                        className="w-10 h-10 rounded-xl bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white hover:bg-violet-800 active:scale-95 transition-all duration-150 shadow-sm cursor-pointer"
                        aria-label="Enviar mensaje"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
