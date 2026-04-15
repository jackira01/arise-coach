'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import {
    getTopicsCatalog,
    adminCreateCategory,
    adminUpdateCategory,
    adminDeleteCategory,
    adminCreateTopic,
    adminUpdateTopic,
    adminDeleteTopic,
    type CatalogCategory,
} from '@/lib/api'

type ModalMode =
    | { type: 'add-category' }
    | { type: 'edit-category'; id: string; currentName: string }
    | { type: 'add-topic'; categoryId: string; categoryName: string }
    | { type: 'edit-topic'; id: string; currentName: string; currentCategoryId: string }
    | null

export default function TemasPanel() {
    const { data: session } = useSession()
    const token = (session as { accessToken?: string } | null)?.accessToken ?? ''

    const [catalog, setCatalog] = useState<CatalogCategory[]>([])
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState<ModalMode>(null)
    const [formName, setFormName] = useState('')
    const [formCategoryId, setFormCategoryId] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState('')
    const [expandedCat, setExpandedCat] = useState<string | null>(null)

    const loadCatalog = useCallback(async () => {
        if (!token) return
        setLoading(true)
        try {
            const data = await getTopicsCatalog(token)
            setCatalog(data)
            if (data.length > 0 && !expandedCat) setExpandedCat(data[0]._id)
        } finally {
            setLoading(false)
        }
    }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => { loadCatalog() }, [loadCatalog])

    function openModal(m: NonNullable<ModalMode>) {
        setModal(m)
        setFormError('')
        if (m.type === 'add-category') {
            setFormName('')
        } else if (m.type === 'edit-category') {
            setFormName(m.currentName)
        } else if (m.type === 'add-topic') {
            setFormName('')
            setFormCategoryId(m.categoryId)
        } else if (m.type === 'edit-topic') {
            setFormName(m.currentName)
            setFormCategoryId(m.currentCategoryId)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!formName.trim()) { setFormError('El nombre es requerido'); return }
        setSubmitting(true)
        setFormError('')
        try {
            if (modal?.type === 'add-category') {
                await adminCreateCategory(token, formName.trim())
            } else if (modal?.type === 'edit-category') {
                await adminUpdateCategory(token, modal.id, formName.trim())
            } else if (modal?.type === 'add-topic') {
                await adminCreateTopic(token, formName.trim(), formCategoryId)
            } else if (modal?.type === 'edit-topic') {
                await adminUpdateTopic(token, modal.id, { name: formName.trim(), categoryId: formCategoryId })
            }
            await loadCatalog()
            setModal(null)
        } catch (err) {
            setFormError((err as Error).message)
        } finally {
            setSubmitting(false)
        }
    }

    async function handleDeleteCategory(id: string, name: string) {
        if (!window.confirm(`¿Eliminar la categoría "${name}"? Solo se puede si no tiene temas asignados.`)) return
        try {
            await adminDeleteCategory(token, id)
            await loadCatalog()
        } catch (err) {
            alert((err as Error).message)
        }
    }

    async function handleDeleteTopic(id: string, name: string) {
        if (!window.confirm(`¿Eliminar el tema "${name}"?`)) return
        try {
            await adminDeleteTopic(token, id)
            await loadCatalog()
        } catch (err) {
            alert((err as Error).message)
        }
    }

    const modalTitle =
        modal?.type === 'add-category' ? 'Nueva categoría' :
            modal?.type === 'edit-category' ? 'Editar categoría' :
                modal?.type === 'add-topic' ? `Nuevo tema en "${(modal as { categoryName: string }).categoryName}"` :
                    modal?.type === 'edit-topic' ? 'Editar tema' : ''

    const showCategorySelector = modal?.type === 'add-topic' || modal?.type === 'edit-topic'

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 font-primary text-[.7rem] tracking-[4px] uppercase text-red-500 mb-2">
                        <span className="w-5 h-px bg-red-500 inline-block" />
                        Admin
                    </div>
                    <h2 className="font-serif text-2xl font-bold uppercase text-[#fff0f0]">Temas del Catálogo</h2>
                    <p className="font-primary text-[.78rem] text-[rgba(255,210,210,.4)] mt-1">
                        Gestiona las categorías y temas disponibles para asignar a los usuarios
                    </p>
                </div>
                <button
                    onClick={() => openModal({ type: 'add-category' })}
                    className="flex items-center gap-2 font-primary text-[.78rem] font-bold uppercase tracking-[1.5px] px-4 py-2 rounded-xl bg-red-700/25 border border-red-500/30 text-red-400 hover:bg-red-700/40 transition-colors shrink-0"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva categoría
                </button>
            </div>

            {/* Catalog list */}
            {loading ? (
                <p className="font-primary text-[.78rem] text-[rgba(255,210,210,.35)] text-center py-10">Cargando catálogo...</p>
            ) : catalog.length === 0 ? (
                <div className="bg-red-950/20 border border-red-800/20 rounded-2xl p-8 text-center">
                    <p className="font-primary text-[.82rem] text-[rgba(255,210,210,.4)]">No hay categorías. Crea una para empezar.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {catalog.map((cat) => {
                        const isOpen = expandedCat === cat._id
                        return (
                            <div key={cat._id} className="bg-red-950/25 backdrop-blur-sm border border-red-800/20 rounded-2xl overflow-hidden">
                                {/* Category header */}
                                <div className="flex items-center justify-between px-5 py-4">
                                    <button
                                        onClick={() => setExpandedCat(isOpen ? null : cat._id)}
                                        className="flex items-center gap-3 flex-1 text-left min-w-0"
                                    >
                                        <svg
                                            className={`w-4 h-4 text-red-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        <h3 className="font-serif text-[.95rem] font-bold uppercase text-[#fff0f0] truncate">{cat.name}</h3>
                                        <span className="font-primary text-[.65rem] uppercase tracking-[1.5px] text-[rgba(255,210,210,.35)] shrink-0">
                                            {cat.topics.length} tema{cat.topics.length !== 1 ? 's' : ''}
                                        </span>
                                    </button>
                                    <div className="flex items-center gap-2 shrink-0 ml-3">
                                        <button
                                            onClick={() => openModal({ type: 'add-topic', categoryId: cat._id, categoryName: cat.name })}
                                            title="Agregar tema"
                                            className="flex items-center gap-1.5 font-primary text-[.7rem] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-lg bg-green-600/15 border border-green-500/25 text-green-400 hover:bg-green-600/30 transition-colors"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Tema
                                        </button>
                                        <button
                                            onClick={() => openModal({ type: 'edit-category', id: cat._id, currentName: cat.name })}
                                            title="Editar categoría"
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[rgba(255,210,210,.35)] hover:text-blue-400 hover:bg-blue-950/40 transition-colors"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(cat._id, cat.name)}
                                            title="Eliminar categoría"
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[rgba(255,210,210,.35)] hover:text-red-400 hover:bg-red-950/40 transition-colors"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Topics list */}
                                {isOpen && (
                                    <div className="border-t border-red-800/15">
                                        {cat.topics.length === 0 ? (
                                            <p className="px-6 py-4 font-primary text-[.75rem] text-[rgba(255,210,210,.3)] italic">
                                                Sin temas. Agrega uno con el botón &quot;+ Tema&quot;.
                                            </p>
                                        ) : (
                                            <ul className="divide-y divide-red-800/10">
                                                {cat.topics.map((topic) => (
                                                    <li key={topic._id} className="flex items-center justify-between px-6 py-3 group hover:bg-red-950/20 transition-colors">
                                                        <div className="flex items-center gap-2.5 min-w-0">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 shrink-0" />
                                                            <span className="font-primary text-[.82rem] text-[rgba(255,210,210,.75)] truncate">{topic.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 shrink-0 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => openModal({ type: 'edit-topic', id: topic._id, currentName: topic.name, currentCategoryId: cat._id })}
                                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-[rgba(255,210,210,.4)] hover:text-blue-400 hover:bg-blue-950/40 transition-colors"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteTopic(topic._id, topic.name)}
                                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-[rgba(255,210,210,.4)] hover:text-red-400 hover:bg-red-950/40 transition-colors"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Modal */}
            {modal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={() => setModal(null)}
                >
                    <form
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleSubmit}
                        className="w-full max-w-md bg-[#1a0a0a] border border-red-800/30 rounded-2xl p-6 flex flex-col gap-5 shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-serif text-lg font-bold uppercase text-[#fff0f0]">{modalTitle}</h3>
                            <button type="button" onClick={() => setModal(null)} className="text-[rgba(255,210,210,.4)] hover:text-rose-400 leading-none text-xl">&times;</button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col gap-1.5">
                                <span className="font-primary text-[.7rem] uppercase tracking-[1.5px] text-[rgba(255,210,210,.5)]">Nombre</span>
                                <input
                                    type="text" required autoFocus
                                    value={formName} onChange={(e) => setFormName(e.target.value)}
                                    placeholder={showCategorySelector ? 'Ej: Rotaciones eficientes' : 'Ej: Macro Game'}
                                    className="bg-red-950/30 border border-red-800/30 rounded-xl px-4 py-2.5 font-primary text-sm text-[rgba(255,210,210,.9)] placeholder:text-[rgba(255,210,210,.25)] focus:outline-none focus:border-red-500/50"
                                />
                            </label>

                            {showCategorySelector && (
                                <label className="flex flex-col gap-1.5">
                                    <span className="font-primary text-[.7rem] uppercase tracking-[1.5px] text-[rgba(255,210,210,.5)]">Categoría</span>
                                    <select
                                        required
                                        value={formCategoryId}
                                        onChange={(e) => setFormCategoryId(e.target.value)}
                                        className="bg-red-950/30 border border-red-800/30 rounded-xl px-4 py-2.5 font-primary text-sm text-[rgba(255,210,210,.9)] focus:outline-none focus:border-red-500/50"
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {catalog.map((c) => (
                                            <option key={c._id} value={c._id}>{c.name}</option>
                                        ))}
                                    </select>
                                </label>
                            )}
                        </div>

                        {formError && <p className="font-primary text-[.75rem] text-rose-400">{formError}</p>}

                        <button
                            type="submit" disabled={submitting}
                            className="w-full font-primary text-[.8rem] font-bold uppercase tracking-[2px] py-3 rounded-xl bg-red-700/25 border border-red-500/40 text-red-400 hover:bg-red-700/40 transition-colors disabled:opacity-50"
                        >
                            {submitting ? 'Guardando...' : 'Guardar'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}
