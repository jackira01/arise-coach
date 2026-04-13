import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                try {
                    const res = await fetch(
                        `${process.env.BACKEND_URL ?? 'http://localhost:4000'}/api/auth/login`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    )

                    if (!res.ok) return null

                    const data = await res.json() as { user?: { id: string; email: string; name?: string; plan?: string }; token?: string }
                    if (!data.user) return null

                    return {
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.name ?? data.user.email,
                        plan: data.user.plan,
                    }
                } catch {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.plan = (user as { plan?: string }).plan
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                (session.user as { plan?: unknown }).plan = token.plan
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
})
