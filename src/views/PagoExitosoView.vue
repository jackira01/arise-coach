<script setup lang="ts">
const WHATSAPP_NUMBER = '529932417620'
const DISCORD_USER_ID = '1385138655139594283'

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`
const discordUrl = `https://discord.com/users/${DISCORD_USER_ID}`
</script>

<template>
  <!-- Fondo fijo igual al resto del sitio -->
  <div
    class="fixed inset-0 z-0 pointer-events-none"
    style="background: radial-gradient(ellipse 60% 55% at 75% 30%, rgba(160,10,10,.5) 0%, transparent 65%), radial-gradient(ellipse 50% 65% at 15% 75%, rgba(100,5,5,.55) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 85% 85%, rgba(80,0,0,.35) 0%, transparent 65%)"
  />

  <main class="relative z-10 min-h-screen flex items-center justify-center px-5 py-20">
    <div class="max-w-xl w-full mx-auto text-center">

      <!-- Icono de éxito -->
      <div class="flex justify-center mb-8">
        <div class="relative">
          <div class="w-24 h-24 rounded-full bg-linear-to-br from-red-700 to-red-500 flex items-center justify-center shadow-[0_0_60px_rgba(200,30,30,.55)]">
            <svg class="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <!-- Glow ring -->
          <div class="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
        </div>
      </div>

      <!-- Eyebrow -->
      <div class="flex items-center justify-center gap-3 font-primary text-[.78rem] tracking-[4px] uppercase text-red-500 mb-4">
        <span class="w-7 h-px bg-red-500 inline-block" />
        ¡Bienvenido al equipo!
        <span class="w-7 h-px bg-red-500 inline-block" />
      </div>

      <!-- Título -->
      <h1 class="font-serif text-[clamp(2rem,5vw,3.2rem)] font-bold uppercase leading-tight mb-5">
        <span class="text-[#fff0f0]">Pago</span>
        <br />
        <span class="bg-linear-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">Exitoso</span>
      </h1>

      <!-- Descripción -->
      <p class="font-primary text-[.98rem] leading-[1.8] text-[rgba(255,210,210,.75)] mb-4">
        Tu pago fue procesado correctamente. Para iniciar tu entrenamiento,
        <strong class="text-white">contáctate con AriseXR</strong> a través de
        uno de los siguientes canales y comparte una <strong class="text-red-400">factura o prueba de compra</strong> del servicio adquirido.
      </p>
      <p class="font-primary text-[.85rem] text-[rgba(255,210,210,.5)] mb-10">
        Nos comunicaremos contigo a la brevedad para coordinar el inicio de tus sesiones.
      </p>

      <!-- Canales de contacto -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-10">

        <!-- WhatsApp -->
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#25D366]/15 border border-[#25D366]/35 text-[#25D366] font-primary text-[.9rem] font-semibold tracking-[1.5px] uppercase transition-all duration-250 hover:bg-[#25D366]/25 hover:border-[#25D366]/70 hover:shadow-[0_0_24px_rgba(37,211,102,.25)]"
        >
          <!-- WhatsApp icon -->
          <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>

        <!-- Discord -->
        <a
          :href="discordUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/35 text-[#7983f5] font-primary text-[.9rem] font-semibold tracking-[1.5px] uppercase transition-all duration-250 hover:bg-[#5865F2]/25 hover:border-[#5865F2]/70 hover:shadow-[0_0_24px_rgba(88,101,242,.3)]"
        >
          <!-- Discord icon -->
          <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          Discord
        </a>
      </div>

      <!-- Nota de prueba de compra -->
      <div class="flex items-start gap-4 bg-amber-950/40 backdrop-blur-sm border border-amber-400/25 rounded-2xl px-6 py-5 text-left shadow-sm">
        <div class="text-2xl shrink-0 mt-0.5">📄</div>
        <div>
          <p class="font-primary text-[.78rem] font-black uppercase tracking-[2px] text-amber-400 mb-1">
            Importante
          </p>
          <p class="font-primary text-[.84rem] text-[rgba(200,185,240,.65)] leading-snug">
            Al contactar a AriseXR, por favor adjunta tu <strong class="text-white">factura o comprobante de pago</strong> del servicio contratado. Esto nos permite validar tu compra y asignarte coach de inmediato.
          </p>
        </div>
      </div>

      <!-- Volver al inicio -->
      <a
        href="/"
        class="inline-block mt-10 font-primary text-[.82rem] tracking-[2px] uppercase text-[rgba(255,210,210,.45)] hover:text-red-400 transition-colors duration-200"
      >
        ← Volver al inicio
      </a>

    </div>
  </main>
</template>
