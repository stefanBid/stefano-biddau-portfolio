<script setup lang="ts">
interface Props {
  planetsIcon: string[]
}

const props = defineProps<Props>()

// Colors live in theme.css (--sb-planet-*)
const PLANET_COUNT = 8
const planetColors = Array.from({ length: PLANET_COUNT }, (_, i) => `var(--sb-planet-${i + 1})`)
const planetAtmosphereColors = Array.from({ length: PLANET_COUNT }, (_, i) => `var(--sb-planet-atmo-${i + 1})`)

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
  <div aria-hidden="true" class="solar-system relative flex items-center justify-center w-full h-full">
    <div class="relative w-85 h-85 overflow-visible">
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
  z-index: 10;
  will-change: transform;
}

@keyframes sunPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.04);
  }
}

/* outer glow */
.sun-glow {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: radial-gradient(circle, var(--sb-sun-200) 0%, var(--sb-sun-500) 55%, transparent 100%);
  filter: blur(16px);
  opacity: 0.95;
}

/* pulsing corona */
.sun-corona {
  position: absolute;
  inset: 12px;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--sb-sun-corona-inner) 45%, transparent) 0%,
    color-mix(in oklab, var(--sb-sun-corona-mid) 28%, transparent) 35%,
    color-mix(in oklab, var(--sb-sun-corona-mid) 18%, transparent) 55%,
    color-mix(in oklab, var(--sb-sun-corona-outer) 10%, transparent) 72%,
    color-mix(in oklab, var(--sb-sun-corona-outer) 6%, transparent) 88%,
    transparent 100%
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

/* sun core */
.sun-core {
  position: absolute;
  inset: 34px;
  border-radius: 9999px;
  background: radial-gradient(circle, var(--sb-sun-100) 0%, var(--sb-sun-200) 55%, var(--sb-sun-400) 100%);
  box-shadow:
    0 0 32px color-mix(in oklab, var(--sb-sun-350) 90%, transparent),
    0 0 64px color-mix(in oklab, var(--sb-sun-500) 80%, transparent);
}

/* rotating flare */
.sun-flare {
  position: absolute;
  inset: 26px;
  border-radius: 9999px;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    color-mix(in oklab, var(--sb-sun-250) 18%, transparent) 40deg,
    transparent 80deg,
    transparent 180deg,
    color-mix(in oklab, var(--sb-sun-300) 16%, transparent) 220deg,
    transparent 260deg,
    transparent 360deg
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
  border: 1px solid color-mix(in oklab, var(--sb-orbit) 28%, transparent);
  animation: orbit-spin var(--orbit-duration) linear infinite;
  animation-delay: var(--orbit-delay);
  z-index: 1;
  will-change: transform;
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
  z-index: 5;
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
    0 0 8px color-mix(in oklab, var(--sb-planet-shadow) 60%, transparent),
    0 0 18px color-mix(in oklab, var(--sb-planet-shadow) 30%, transparent);
  transform: rotate(var(--planet-tilt));
  animation: planetTilt 9s ease-in-out infinite;
  will-change: transform;
}

@keyframes planetTilt {
  0%, 100% { transform: rotate(var(--planet-tilt)); }
  50%     { transform: rotate(calc(var(--planet-tilt) + 2deg)); }
}

/* planet atmosphere */
.planet-body::before {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    var(--planet-atmosphere) 0%,
    transparent 70%
  );
  opacity: 0.85;
  filter: blur(3px);
  animation: atmospherePulse 7s ease-in-out infinite;
}

@keyframes atmospherePulse {
  0%, 100% { opacity: 0.75; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.04); }
}

/* planet icon */
.planet-icon {
  position: relative;
  z-index: 1;
  color: var(--sb-ink);
  filter: drop-shadow(0 0 2px var(--sb-shadow-color));
}

/* --- MOONS --- */

.moon-orbit {
  position: absolute;
  width: 62px;
  height: 62px;
  border-radius: 9999px;
  border: 1px solid color-mix(in oklab, var(--sb-orbit) 35%, transparent);
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
  background: radial-gradient(circle, var(--sb-moon-100) 0%, var(--sb-ink-muted) 70%);
  box-shadow: 0 0 6px color-mix(in oklab, var(--sb-planet-shadow) 70%, transparent);
}

@keyframes moonOrbit {
  0%   { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .solar-system *,
  .solar-system *::before,
  .solar-system *::after {
    animation-play-state: paused !important;
  }
}
</style>
