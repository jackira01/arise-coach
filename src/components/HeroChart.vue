<template>
  <div
    class="opacity-0 animate-[chartReveal_1.2s_cubic-bezier(.22,1,.36,1)_.6s_forwards] relative w-full h-full flex items-center justify-center"
  >
    <!-- Ambient glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 60% 50% at 60% 55%, rgba(90,100,220,.18) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 40% 40%, rgba(50,30,120,.14) 0%, transparent 70%)"
    />
    <div class="w-full h-full animate-[floatY_5s_ease-in-out_1.8s_infinite]">
      <img
        src="/grafics.png"
        alt="Gráfico de rangos de League of Legends — de Iron a Challenger"
        class="object-contain object-center scale-125 w-full h-full [filter:drop-shadow(0_0_40px_rgba(0,180,255,.18))_drop-shadow(0_0_80px_rgba(100,60,200,.15))]"
      />
    </div>
  </div>
</template>
