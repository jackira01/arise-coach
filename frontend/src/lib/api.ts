// Admin API functions for interacting with the backend

export interface AdminUserSummary {
    _id: string
    name: string
    email: string
    plan?: string | null
    role?: string
    additionalHours?: number
    sessions?: UserSession[]
}

export interface UserSession {
    _id?: string
    date: string
    hours: number
    topic: string
    notes?: string
    addedAt?: string
}

export interface UserProfile extends AdminUserSummary {
    role?: 'user' | 'admin'
    plan?: 'silver' | 'esmerald' | 'diamond' | 'challenger' | null
    additionalHours?: number
    sessions?: UserSession[]
    topics?: Array<{
        _id?: string
        name: string
        categoryName?: string
        status: 'pendiente' | 'en-progreso' | 'completado'
    }>
    createdAt?: string
    updatedAt?: string
}

const API_BASE = '/api'

/**
 * Search admin users by name or email
 */
export async function adminSearchUsers(
    token: string,
    query: string
): Promise<AdminUserSummary[]> {
    try {
        const params = new URLSearchParams()
        if (query) params.append('q', query)

        const response = await fetch(`${API_BASE}/admin/users?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to search users: ${response.statusText}`)
        }

        const data = await response.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error('Error searching users:', error)
        throw error
    }
}

/**
 * Get a user's full profile
 */
export async function adminGetUserProfile(
    token: string,
    userId: string
): Promise<UserProfile> {
    try {
        const response = await fetch(`${API_BASE}/admin/users/${userId}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to get user profile: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error getting user profile:', error)
        throw error
    }
}

/**
 * Get user sessions
 */
export async function adminGetUserSessions(
    token: string,
    userId: string
): Promise<any[]> {
    try {
        const response = await fetch(`${API_BASE}/admin/users/${userId}/sessions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to get user sessions: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error getting user sessions:', error)
        throw error
    }
}

/**
 * Get user invoices
 */
export async function adminGetUserInvoices(
    token: string,
    userId: string
): Promise<any[]> {
    try {
        const response = await fetch(`${API_BASE}/admin/users/${userId}/invoices`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to get user invoices: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error getting user invoices:', error)
        throw error
    }
}

/**
 * Update user topic status
 */
export async function adminUpdateUserTopic(
    token: string,
    userId: string,
    topicName: string,
    status: 'pendiente' | 'en-progreso' | 'completado'
): Promise<any> {
    try {
        const response = await fetch(
            `${API_BASE}/admin/users/${userId}/topics/${topicName}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            }
        )

        if (!response.ok) {
            throw new Error(`Failed to update topic: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error updating user topic:', error)
        throw error
    }
}

/**
 * Admin: agregar sesión (completar horas) a un usuario
 */
export async function adminAddSession(
    token: string,
    userId: string,
    payload: { hours: number; topic: string; notes?: string; date?: string }
): Promise<{ sessions: UserSession[]; completedHours: number }> {
    const response = await fetch(`${API_BASE}/admin/users/${userId}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
    return response.json()
}

/**
 * Admin: incrementar horas base de un usuario
 */
export async function adminAddBaseHours(
    token: string,
    userId: string,
    additionalHours: number
): Promise<{ additionalHours: number }> {
    const response = await fetch(`${API_BASE}/admin/users/${userId}/hours`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ additionalHours }),
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
    return response.json()
}

// ── Topics catalog ────────────────────────────────────────────────────────────

export interface CatalogTopic {
    _id: string
    name: string
    categoryId: string
}

export interface CatalogCategory {
    _id: string
    name: string
    topics: CatalogTopic[]
}

export async function getTopicsCatalog(token: string): Promise<CatalogCategory[]> {
    const response = await fetch(`${API_BASE}/topics/categories`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error(`Error ${response.status}`)
    return response.json()
}

export async function adminCreateCategory(token: string, name: string): Promise<CatalogCategory> {
    const response = await fetch(`${API_BASE}/topics/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name }),
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
    return response.json()
}

export async function adminUpdateCategory(token: string, id: string, name: string): Promise<CatalogCategory> {
    const response = await fetch(`${API_BASE}/topics/categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name }),
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
    return response.json()
}

export async function adminDeleteCategory(token: string, id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/topics/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
}

export async function adminCreateTopic(token: string, name: string, categoryId: string): Promise<CatalogTopic> {
    const response = await fetch(`${API_BASE}/topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, categoryId }),
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
    return response.json()
}

export async function adminUpdateTopic(token: string, id: string, payload: { name?: string; categoryId?: string }): Promise<CatalogTopic> {
    const response = await fetch(`${API_BASE}/topics/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
    return response.json()
}

export async function adminDeleteTopic(token: string, id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/topics/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
}

export async function adminUpdateUserTopicStatus(
    token: string,
    userId: string,
    topicId: string,
    status: 'pendiente' | 'en-progreso' | 'completado'
): Promise<{ topics: UserProfile['topics'] }> {
    const response = await fetch(`${API_BASE}/admin/users/${userId}/topic-status/${topicId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
    return response.json()
}

export async function adminUpsertTopicStatus(
    token: string,
    userId: string,
    name: string,
    categoryName: string,
    status: 'pendiente' | 'en-progreso' | 'completado'
): Promise<{ topics: UserProfile['topics'] }> {
    const response = await fetch(`${API_BASE}/admin/users/${userId}/topic-status/by-name`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, categoryName, status }),
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
    return response.json()
}

export async function adminAddTopicToUser(
    token: string,
    userId: string,
    topicId: string
): Promise<{ topics: UserProfile['topics'] }> {
    const response = await fetch(`${API_BASE}/admin/users/${userId}/topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ topicId }),
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string }
        throw new Error(err.message ?? `Error ${response.status}`)
    }
    return response.json()
}
