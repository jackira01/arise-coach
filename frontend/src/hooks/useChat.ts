import { useEffect, useRef, useReducer, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getSocket, disconnectSocket } from '@/lib/socket'
import { fetchChatHistory, type ChatMessage } from '@/lib/api'

// ── Live messages reducer ─────────────────────────────────────────────────────
type LiveAction =
    | { type: 'append'; msg: ChatMessage }
    | { type: 'reset' }

function liveReducer(state: ChatMessage[], action: LiveAction): ChatMessage[] {
    switch (action.type) {
        case 'append':
            // Evitar duplicados por si el emisor recibe su propio mensaje vía socket
            if (state.some((m) => m._id === action.msg._id)) return state
            return [...state, action.msg]
        case 'reset':
            return []
    }
}

export interface UseChatOptions {
    token: string
    /** userId de la sala (siempre el ID del usuario normal) */
    roomUserId: string | null
    enabled?: boolean
}

export function useChat({ token, roomUserId, enabled = true }: UseChatOptions) {
    const [liveMessages, dispatch] = useReducer(liveReducer, [])
    const [isTyping, setIsTyping] = useReducer((_: boolean, v: boolean) => v, false)
    const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    // ── Historial paginado (TanStack Query) ───────────────────────────────────
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isLoadingHistory,
    } = useInfiniteQuery({
        queryKey: ['chat-history', roomUserId],
        queryFn: ({ pageParam }) => fetchChatHistory(token, roomUserId!, pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        enabled: !!token && !!roomUserId && enabled,
        staleTime: 1000 * 30,
    })

    // Mensajes históricos: página 1 = más antigua → aplanamos en orden
    const historyMessages: ChatMessage[] = data
        ? data.pages.flatMap((p) => p.messages)
        : []

    // ── Socket: conectar / unirse a sala ──────────────────────────────────────
    useEffect(() => {
        if (!token || !roomUserId || !enabled) return

        const socket = getSocket(token)

        socket.emit('join_room', roomUserId)

        socket.on('receive_message', (msg: ChatMessage) => {
            dispatch({ type: 'append', msg })
        })

        socket.on('typing', () => {
            setIsTyping(true)
            // Auto-limpiar si no llegan más eventos en 3s
            if (typingTimer.current) clearTimeout(typingTimer.current)
            typingTimer.current = setTimeout(() => setIsTyping(false), 3000)
        })

        socket.on('stop_typing', () => {
            if (typingTimer.current) clearTimeout(typingTimer.current)
            setIsTyping(false)
        })

        return () => {
            socket.off('receive_message')
            socket.off('typing')
            socket.off('stop_typing')
        }
    }, [token, roomUserId, enabled])

    // Limpiar mensajes en vivo al cambiar de sala
    useEffect(() => {
        dispatch({ type: 'reset' })
    }, [roomUserId])

    // Desconectar al desmontar
    useEffect(() => {
        return () => {
            disconnectSocket()
        }
    }, [])

    // ── Acciones ──────────────────────────────────────────────────────────────
    const sendMessage = useCallback(
        (text: string) => {
            if (!text.trim() || !roomUserId) return
            const socket = getSocket(token)
            socket.emit('send_message', { roomUserId, text: text.trim() })
        },
        [token, roomUserId]
    )

    const emitTyping = useCallback(
        (typing: boolean) => {
            if (!roomUserId) return
            const socket = getSocket(token)
            socket.emit(typing ? 'typing' : 'stop_typing', roomUserId)
        },
        [token, roomUserId]
    )

    return {
        historyMessages,
        liveMessages,
        isTyping,
        isLoadingHistory,
        hasNextPage: !!hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        sendMessage,
        emitTyping,
    }
}
