'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { adminSearchUsers, type AdminUserSummary } from '@/lib/api'

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

// ── Admin: WhatsApp-style sidebar ─────────────────────────────────────────────
function AdminChatSidebar({
    users,
    selected,
    onSelect,
    searchQuery,
    onSearch,
}: {
    users: AdminUserSummary[]
    selected: AdminUserSummary | null
    onSelect: (u: AdminUserSummary) => void
    searchQuery: string
    onSearch: (q: string) => void
}) {
    return (
        <div className="w-72 shrink-0 flex flex-col bg-[#0c0101]/80 border-r border-red-800/20 rounded-l-2xl overflow-hidden">
            {/* Search */}
            <div className="px-4 pt-4 pb-3 border-b border-red-800/20 shrink-0">
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-red-500/50 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="Buscar usuario…"
                        className="w-full bg-red-950/30 border border-red-800/25 rounded-xl pl-9 pr-3 py-2 font-primary text-[.8rem] text-[#fff0f0] placeholder-[rgba(255,210,210,.3)] focus:outline-none focus:border-red-600/50 transition-colors"
                    />
                </div>
            </div>
            {/* User list */}
            <div className="flex-1 overflow-y-auto">
                {users.length === 0 && (
                    <p className="font-primary text-[.72rem] text-[rgba(255,210,210,.3)] text-center py-8 px-4">Sin resultados</p>
                )}
                {users.map((u) => (
                    <button
                        key={u._id}
                        onClick={() => onSelect(u)}
                        className={`flex items-center gap-3 w-full px-4 py-3.5 transition-colors duration-150 text-left border-b border-red-800/10 ${selected?._id === u._id ? 'bg-red-900/50' : 'hover:bg-red-950/40'
                            }`}
                    >
                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-red-700 to-red-500 flex items-center justify-center text-white text-sm font-bold font-primary shrink-0">
                            {u.name[0]?.toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-primary text-[.85rem] font-semibold text-[#fff0f0] truncate">{u.name}</p>
                            <p className="font-primary text-[.68rem] text-[rgba(255,210,210,.4)] truncate">{u.email}</p>
                        </div>
                        {u.plan && (
                            <span className="shrink-0 font-primary text-[.55rem] uppercase tracking-[1px] text-red-400 bg-red-950/50 border border-red-700/30 px-1.5 py-0.5 rounded-full">
                                {u.plan}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default function ChatPanel({ isAdmin }: { isAdmin?: boolean }) {
    const { data: session } = useSession()
    const token = (session as { accessToken?: string } | null)?.accessToken ?? ''

    // Per-user message store (keyed by userId, 'me' for normal user)
    const [messageStore, setMessageStore] = useState<Record<string, Message[]>>({ me: INITIAL_MESSAGES })
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)

    // Admin state
    const [adminUsers, setAdminUsers] = useState<AdminUserSummary[]>([])
    const [adminSearch, setAdminSearch] = useState('')
    const [selectedUser, setSelectedUser] = useState<AdminUserSummary | null>(null)
    const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)

    const chatKey = isAdmin ? (selectedUser?._id ?? '__none__') : 'me'
    const messages = messageStore[chatKey] ?? []

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Load admin users on search change
    useEffect(() => {
        if (!isAdmin || !token) return
        if (debounce.current) clearTimeout(debounce.current)
        debounce.current = setTimeout(async () => {
            try {
                const users = await adminSearchUsers(token, adminSearch)
                setAdminUsers(users)
            } catch { /* ignore */ }
        }, 300)
    }, [adminSearch, isAdmin, token])

    // Load all users on mount when admin
    useEffect(() => {
        if (!isAdmin || !token) return
        adminSearchUsers(token, '').then(setAdminUsers).catch(() => { })
    }, [isAdmin, token])

    function sendMessage(e: React.FormEvent) {
        e.preventDefault()
        const text = input.trim()
        if (!text) return

        const now = new Date()
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

        setMessageStore((prev) => ({
            ...prev,
            [chatKey]: [...(prev[chatKey] ?? []), { id: Date.now(), from: isAdmin ? 'coach' : 'student', text, time }],
        }))
        setInput('')

        if (!isAdmin) {
            // Simulated coach reply for normal user
            setTimeout(() => {
                setMessageStore((prev) => ({
                    ...prev,
                    [chatKey]: [
                        ...(prev[chatKey] ?? []),
                        {
                            id: Date.now() + 1,
                            from: 'coach',
                            text: '¡Recibido! Lo tengo en cuenta para la próxima sesión. Sigue practicando. 💪',
                            time: `${now.getHours().toString().padStart(2, '0')}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`,
                        },
                    ],
                }))
            }, 1500)
        }
    }

    return (
        <div className="flex flex-col gap-5" style={{ height: 'calc(100vh - 9rem)' }}>
            {/* Header */}
            <div className="shrink-0">
                <div className="flex items-center gap-3 font-primary text-[.7rem] tracking-[4px] uppercase text-red-500 mb-2">
                    <span className="w-5 h-px bg-red-500 inline-block" />
                    Chat
                </div>
                <h2 className="font-serif text-2xl font-bold uppercase text-[#fff0f0]">
                    {isAdmin ? 'Chats con Usuarios' : 'Chat con tu Coach'}
                </h2>
            </div>

            {/* Chat container — fills remaining height */}
            <div className="bg-red-950/20 backdrop-blur-sm border border-red-800/20 rounded-2xl flex overflow-hidden flex-1 min-h-0">

                {/* ── Admin sidebar ── */}
                {isAdmin && (
                    <AdminChatSidebar
                        users={adminUsers}
                        selected={selectedUser}
                        onSelect={setSelectedUser}
                        searchQuery={adminSearch}
                        onSearch={setAdminSearch}
                    />
                )}

                {/* ── Chat area ── */}
                <div className="flex flex-col flex-1 min-w-0">
                    {/* Top bar */}
                    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-red-800/20 bg-red-950/30 shrink-0">
                        {isAdmin ? (
                            selectedUser ? (
                                <>
                                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-red-700 to-red-500 flex items-center justify-center text-white font-bold text-sm font-primary shrink-0">
                                        {selectedUser.name[0]?.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-primary text-[.88rem] font-semibold text-[#fff0f0]">{selectedUser.name}</p>
                                        <p className="font-primary text-[.68rem] text-[rgba(255,210,210,.45)]">{selectedUser.email}</p>
                                    </div>
                                </>
                            ) : (
                                <p className="font-primary text-[.82rem] text-[rgba(255,210,210,.4)]">Selecciona un usuario para chatear</p>
                            )
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>

                    {/* Messages */}
                    {(!isAdmin || selectedUser) ? (
                        <>
                            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 scroll-smooth min-h-0">
                                {messages.map((msg) => {
                                    // For admin, 'coach' = admin sending, 'student' = user message
                                    const isSelf = isAdmin ? msg.from === 'coach' : msg.from === 'student'
                                    return (
                                        <div key={msg.id} className={`flex gap-2.5 ${isSelf ? 'flex-row-reverse' : ''}`}>
                                            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold font-primary ${msg.from === 'coach'
                                                ? 'bg-linear-to-br from-red-700 to-red-500 text-white'
                                                : 'bg-red-950/50 border border-red-800/30 text-[rgba(255,210,210,.7)]'
                                                }`}>
                                                {msg.from === 'coach' ? 'C' : (selectedUser ? selectedUser.name[0]?.toUpperCase() : 'T')}
                                            </div>
                                            <div className={`max-w-[72%] flex flex-col gap-1 ${isSelf ? 'items-end' : 'items-start'}`}>
                                                <div className={`px-4 py-2.5 rounded-2xl font-primary text-[.85rem] leading-relaxed ${isSelf
                                                    ? 'bg-red-700/70 text-white rounded-tr-sm'
                                                    : 'bg-red-950/60 border border-red-800/25 text-[rgba(255,210,210,.9)] rounded-tl-sm'
                                                    }`}>
                                                    {msg.text}
                                                </div>
                                                <span className="font-primary text-[.65rem] text-[rgba(255,210,210,.35)]">{msg.time}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div ref={bottomRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={sendMessage} className="flex items-center gap-3 px-4 py-3 border-t border-red-800/20 bg-red-950/30 shrink-0">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={isAdmin ? `Mensaje a ${selectedUser?.name ?? ''}…` : 'Escribe un mensaje...'}
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
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-800/20 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-7 h-7 text-red-500/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                    </svg>
                                </div>
                                <p className="font-primary text-[.82rem] text-[rgba(255,210,210,.35)]">Selecciona un usuario de la lista</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
