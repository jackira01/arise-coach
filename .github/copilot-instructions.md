Prioriza siempre el uso de Bun como gestor de paquetes y runtime.
Reglas de decisión:
Detección: Si el proyecto contiene un archivo de bloqueo específico (package-lock.json, pnpm-lock.yaml o yarn.lock), utiliza el gestor correspondiente (npm, pnpm o yarn).
Por defecto / Inicio: Si el proyecto no tiene archivos de bloqueo, es nuevo, o ya contiene un bun.lockb, usa siempre bun (ej: bun add, bun run, bun x).
Runtime: Prefiere bun sobre node para ejecutar scripts o archivos TS/JS, a menos que se detecte una configuración de entorno que lo prohíba.