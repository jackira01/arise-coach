'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { adminSearchUsers, type AdminUserSummary } from '@/lib/api'

interface Props {
    onSelect: (user: AdminUserSummary | null) => void
    selected: AdminUserSummary | null
}

export default function UserSearchFilter({ onSelect, selected }: Props) {
    const { data: session } = useSession()
    const token = (session as { accessToken?: string } | null)?.accessToken ?? ''

    const [query, setQuery] = useState('')
    const [results, setResults] = useState<AdminUserSummary[]>([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!token) return
        if (debounce.current) clearTimeout(debounce.current)
        debounce.current = setTimeout(async () => {
            setLoading(true)
            try {
                const users = await adminSearchUsers(token, query)
                setResults(users)
                setOpen(true)
            } catch {
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 300)
    }, [query, token])

    // Close dropdown on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div ref={containerRef} className="relative w-full max-w-sm">
            {selected ? (
                <div className="flex items-center gap-3 bg-red-950/40 border border-red-700/40 rounded-xl px-4 py-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-700 to-red-500 flex items-center justify-center text-white text-xs font-bold font-primary shrink-0">
                        {selected.name[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-primary text-[.85rem] font-semibold text-[#fff0f0] truncate">{selected.name}</p>
                        <p className="font-primary text-[.68rem] text-[rgba(255,210,210,.5)] truncate">{selected.email}</p>
                    </div>
                    <button
                        onClick={() => { onSelect(null); setQuery('') }}
                        className="text-[rgba(255,210,210,.35)] hover:text-red-400 transition-colors duration-200 shrink-0"
                        aria-label="Quitar filtro"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500/50 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setOpen(true)}
                        placeholder="Buscar usuario por nombre o correo…"
                        className="w-full bg-red-950/30 border border-red-800/30 rounded-xl pl-10 pr-4 py-2.5 font-primary text-[.85rem] text-[#fff0f0] placeholder-[rgba(255,210,210,.3)] focus:outline-none focus:border-red-600/60 transition-colors duration-200"
                    />
                    {loading && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-red-500/40 border-t-red-500 rounded-full animate-spin" />
                    )}
                </div>
            )}

            {open && !selected && results.length > 0 && (
                <div className="absolute z-[100] top-full mt-1.5 w-full bg-[#110202]/95 backdrop-blur-xl border border-red-800/30 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,.6)] overflow-hidden max-h-[calc(5*3.5rem)] overflow-y-auto">
                    {results.map((u) => (
                        <button
                            key={u._id}
                            onClick={() => { onSelect(u); setOpen(false) }}
                            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-950/50 transition-colors duration-150 text-left"
                        >
                            <div className="w-7 h-7 rounded-full bg-linear-to-br from-red-700 to-red-500 flex items-center justify-center text-white text-xs font-bold font-primary shrink-0">
                                {u.name[0]?.toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <p className="font-primary text-[.85rem] font-semibold text-[#fff0f0] truncate">{u.name}</p>
                                <p className="font-primary text-[.68rem] text-[rgba(255,210,210,.45)] truncate">{u.email}</p>
                            </div>
                            {u.plan && (
                                <span className="ml-auto shrink-0 font-primary text-[.6rem] uppercase tracking-[1px] text-red-400 bg-red-950/50 border border-red-700/30 px-2 py-0.5 rounded-full">
                                    {u.plan}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
