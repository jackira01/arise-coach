import { io, type Socket } from 'socket.io-client'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000'

let socket: Socket | null = null
let currentToken: string | null = null

export function getSocket(token: string): Socket {
    if (socket && currentToken === token && socket.connected) {
        return socket
    }

    // Desconectar anterior si el token cambió
    if (socket) {
        socket.disconnect()
        socket = null
    }

    currentToken = token
    socket = io(BACKEND_URL, {
        autoConnect: true,
        auth: { token },
        transports: ['websocket'],
    })

    return socket
}

export function disconnectSocket() {
    if (socket) {
        socket.disconnect()
        socket = null
        currentToken = null
    }
}
