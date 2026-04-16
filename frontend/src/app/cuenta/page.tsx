"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PanelNav, { type Section } from "@/components/cuenta/PanelNav";
import Seguimiento from "@/components/cuenta/Seguimiento";
import Chat from "@/components/cuenta/Chat";
import Paquetes from "@/components/cuenta/Paquetes";
import Facturacion from "@/components/cuenta/Facturacion";

const SECTION_MAP: Record<Section, React.ReactNode> = {
    seguimiento: <Seguimiento />,
    chat:        <Chat />,
    paquetes:    <Paquetes />,
    facturacion: <Facturacion />,
};

export default function CuentaPage() {
    const [activeSection, setActiveSection] = useState<Section>("seguimiento");

    return (
        <>
            {/* Fondo radial igual que la home */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 55% 55% at 75% 35%, rgba(60,30,120,.18) 0%, transparent 70%)," +
                        "radial-gradient(ellipse 45% 65% at 20% 75%, rgba(10,30,90,.18) 0%, transparent 70%)," +
                        "radial-gradient(ellipse 35% 40% at 85% 85%, rgba(20,8,60,.12) 0%, transparent 70%)",
                }}
            />

            {/* Header */}
            <Header />

            {/* Layout principal */}
            <main className="relative z-10 min-h-screen pt-17 px-6 md:px-12 lg:px-20 pb-16">
                <div className="max-w-5xl mx-auto">
                    {/* Título de página */}
                    <div className="pt-10 pb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-[#1a0f35] tracking-tight">
                            Mi cuenta
                        </h1>
                        <p className="text-sm text-[rgba(30,20,70,.45)] mt-1 tracking-wide">
                            Panel de control · jugaidor123
                        </p>
                    </div>

                    {/* Dos columnas: sidebar + contenido */}
                    <div className="flex gap-8 items-start">
                        <PanelNav active={activeSection} onChange={setActiveSection} />

                        {/* Área de contenido */}
                        <section className="flex-1 min-w-0">
                            {SECTION_MAP[activeSection]}
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}
