<script setup lang="ts">
interface Props {
  planetsIcon: string[]
}

const props = defineProps<Props>()

// Planet body colors
const planetColors = [
  '#b6b6b6',
  '#d8c18f',
  '#3c82f6',
  '#c1440e',
  '#d9a066',
  '#e7d9a4',
  '#7dd3fc',
  '#2563eb',
]

// Atmosphere colors
const planetAtmosphereColors = [
  '#e5e7eb',
  '#f5e7c4',
  '#93c5fd',
  '#f9735b',
  '#f2c58b',
  '#f8f5d4',
  '#bae6fd',
  '#60a5fa',
]

const getOrbitStyle = (index: number, total: number) => {
  const safeTotal = Math.max(total - 1, 1)
  const baseSize = 230
  const step = 50
  const size = baseSize + index * step

  // Fewer planets make the system faster; non-linear curve distributes speed inner→outer
  const clampedTotal = Math.min(Math.max(total, 1), 8)
  const systemRatio = (clampedTotal - 1) / 7

  const slowMin = 6.8 // +0.9 from previous
  const slowMax = 13.4 // +1.2
  const fastMin = 3.4 // +0.5
  const fastMax = 7.2 // +0.5

  const slowDuration = slowMin + (slowMax - slowMin) * systemRatio
  const fastDuration = fastMin + (fastMax - fastMin) * systemRatio

  const linear = safeTotal === 0 ? 0 : index / safeTotal
  const curved = Math.pow(linear, 0.8)

  const duration = slowDuration - curved * (slowDuration - fastDuration)

  const phase = (index * 0.61803398875) % 1
  const delay = -(duration * phase)

  return {
    '--orbit-size': `${size}px`,
    '--orbit-duration': `${duration}s`,
    '--orbit-delay': `${delay}s`,
    '--planet-color': planetColors[index % planetColors.length],
    '--planet-atmosphere': planetAtmosphereColors[index % planetAtmosphereColors.length],
    '--planet-tilt': `${(index % 2 === 0 ? 1 : -1) * 6}deg`,
  }
}
</script>

<template>
  <div class="relative flex items-center justify-center w-full h-full">
    <div class="relative w-[340px] h-[340px] overflow-visible">
      <!-- ☀️ SUN -->
      <div class="sun">
        <div class="sun-glow"></div>
        <div class="sun-corona"></div>
        <div class="sun-core"></div>
        <div class="sun-flare"></div>
      </div>

      <!-- 🪐 PLANETS -->
      <div
        v-for="(icon, index) in props.planetsIcon"
        :key="icon + '-' + index"
        class="orbit"
        :class="{ 'orbit--reverse': index % 2 === 1 }"
        :style="getOrbitStyle(index, props.planetsIcon.length)"
      >
        <div class="planet">
          <div class="planet-body">
            <Icon class="w-6 h-6 planet-icon" :name="icon" />

            <div
              v-if="index === 2 || index === 4"
              class="moon-orbit"
            >
              <div class="moon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- SUN --- */

.sun {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 180px;
  height: 180px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: sunPulse 4s ease-in-out infinite;
  z-index: 10;              /* <-- sempre sopra tutto */
  will-change: transform;   /* <-- hint GPU */
}

@keyframes sunPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.04);
  }
}

/* glow esterno */
.sun-glow {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: radial-gradient(circle, #fde68a 0%, #f97316 55%, transparent 100%);
  filter: blur(16px);
  opacity: 0.95;
}

/* corona con pulsazione luminosa */
.sun-corona {
  position: absolute;
  inset: 12px;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    rgba(255, 191, 120, 0.45) 0%,
    rgba(255, 162, 60, 0.28) 35%,
    rgba(255, 136, 34, 0.18) 55%,
    rgba(255, 115, 20, 0.10) 72%,
    rgba(255, 102, 0, 0.06) 88%,
    rgba(255, 94, 0, 0.0) 100%
  );
  filter: blur(7px);
  opacity: 0.92;
  animation: coronaPulse 6s ease-in-out infinite;
}

@keyframes coronaPulse {
  0%, 100% {
    opacity: 0.75;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.06);
  }
}

/* core del sole */
.sun-core {
  position: absolute;
  inset: 34px;
  border-radius: 9999px;
  background: radial-gradient(circle, #fff9c4 0%, #fde68a 55%, #f59e0b 100%);
  box-shadow:
    0 0 32px rgba(250, 204, 21, 0.9),
    0 0 64px rgba(249, 115, 22, 0.8);
}

/* flare che ruota */
.sun-flare {
  position: absolute;
  inset: 26px;
  border-radius: 9999px;
  background: conic-gradient(
    from 0deg,
    rgba(253, 224, 71, 0.0) 0deg,
    rgba(253, 224, 71, 0.18) 40deg,
    rgba(253, 224, 71, 0.0) 80deg,
    rgba(251, 191, 36, 0.0) 180deg,
    rgba(251, 191, 36, 0.16) 220deg,
    rgba(251, 191, 36, 0.0) 260deg,
    rgba(253, 224, 71, 0.0) 360deg
  );
  mix-blend-mode: screen;
  opacity: 0.9;
  animation: sunFlareSpin 28s linear infinite;
}

@keyframes sunFlareSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* --- ORBITS --- */

.orbit {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--orbit-size);
  height: var(--orbit-size);
  border-radius: 9999px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  animation: orbit-spin var(--orbit-duration) linear infinite;
  animation-delay: var(--orbit-delay);
  z-index: 1;               /* <-- sotto il sole */
  will-change: transform;   /* <-- hint GPU su rotazione */
}

.orbit--reverse {
  animation-name: orbit-spin-reverse;
}

@keyframes orbit-spin {
  0%   { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes orbit-spin-reverse {
  0%   { transform: translate(-50%, -50%) rotate(360deg); }
  100% { transform: translate(-50%, -50%) rotate(0deg); }
}

/* --- PLANETS --- */

.planet {
  position: absolute;
  top: 50%;
  left: -22px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  z-index: 5; /* sopra le orbite, sotto il sole (se si sovrapponesse mai) */
}

.planet-body {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background-color: var(--planet-color);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 8px rgba(15, 23, 42, 0.6),
    0 0 18px rgba(15, 23, 42, 0.3);
  transform: rotate(var(--planet-tilt));
  animation: planetTilt 9s ease-in-out infinite;
  will-change: transform; /* tilt animato → hint GPU */
}

@keyframes planetTilt {
  0%, 100% { transform: rotate(var(--planet-tilt)); }
  50%     { transform: rotate(calc(var(--planet-tilt) + 2deg)); }
}

/* atmosfera del pianeta */
.planet-body::before {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    var(--planet-atmosphere) 0%,
    rgba(15, 23, 42, 0) 70%
  );
  opacity: 0.85;
  filter: blur(3px);
  animation: atmospherePulse 7s ease-in-out infinite;
}

@keyframes atmospherePulse {
  0%, 100% { opacity: 0.75; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.04); }
}

/* icona sopra il pianeta */
.planet-icon {
  position: relative;
  z-index: 1;
  color: white;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.4));
}

/* --- MOONS --- */

.moon-orbit {
  position: absolute;
  width: 62px;
  height: 62px;
  border-radius: 9999px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: moonOrbit 10s linear infinite;
}

.moon {
  position: absolute;
  top: 50%;
  right: -6px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: radial-gradient(circle, #e5e7eb 0%, #9ca3af 70%);
  box-shadow: 0 0 6px rgba(15, 23, 42, 0.7);
}

@keyframes moonOrbit {
  0%   { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
</style>
