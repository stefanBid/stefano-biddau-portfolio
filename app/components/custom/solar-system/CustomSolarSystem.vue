<script setup lang="ts">
interface Props {
  planetsIcon: string[]
}

const props = defineProps<Props>()

// Realistic planet colors
const planetColors = [
  '#b6b6b6', // Mercury
  '#d8c18f', // Venus
  '#3c82f6', // Earth
  '#c1440e', // Mars
  '#d9a066', // Jupiter
  '#e7d9a4', // Saturn
  '#7dd3fc', // Uranus
  '#2563eb', // Neptune
]

// Compute orbit style: size, duration, color, and phase offset
const getOrbitStyle = (index: number, total: number) => {
  const baseSize = 230
  const step = 50
  const size = baseSize + index * step

  const baseDuration = 10
  const duration = baseDuration + index * 4

  // phase in [0, 1), spread across total planets
  const safeTotal = Math.max(total, 1)
  const phase = index / safeTotal
  // negative delay so they start already rotated at different angles
  const delaySeconds = -(duration * phase)

  return {
    '--orbit-size': `${size}px`,
    '--orbit-duration': `${duration}s`,
    '--orbit-delay': `${delaySeconds}s`,
    '--planet-color': planetColors[index % planetColors.length],
  } as Record<string, string>
}
</script>

<template>
  <div class="relative flex items-center justify-center w-full h-full">
    <div class="relative w-[340px] h-[340px]">
      <!-- SUN -->
      <div class="sun">
        <div class="sun-glow"></div>
        <div class="sun-core sun-pulse"></div>
        <div class="sun-ring"></div>
      </div>

      <!-- ORBITS + PLANETS -->
      <div
        v-for="(icon, index) in planetsIcon"
        :key="icon + '-' + index"
        class="orbit"
        :class="{ 'orbit--reverse': index % 2 === 1 }"
        :style="getOrbitStyle(index, planetsIcon.length)"
      >
        <div class="planet">
          <Icon class="w-6 h-6 icon" :name="icon" />
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
}

.sun-glow {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: radial-gradient(circle, #fde68a 0%, #f97316 55%, transparent 100%);
  filter: blur(14px);
  opacity: 0.9;
}

.sun-core {
  position: absolute;
  inset: 34px;
  border-radius: 9999px;
  background: radial-gradient(circle, #fff9c4 0%, #fde68a 50%, #f59e0b 100%);
  box-shadow:
    0 0 22px rgba(250, 204, 21, 0.9),
    0 0 48px rgba(249, 115, 22, 0.8);
}

.sun-ring {
  position: absolute;
  inset: 20px;
  border-radius: 9999px;
  border: 4px solid rgba(250, 204, 21, 0.55);
}

/* --- ORBITS --- */
.orbit {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--orbit-size);
  height: var(--orbit-size);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  animation: orbit-spin var(--orbit-duration) linear infinite;
  animation-delay: var(--orbit-delay);
}

.orbit--reverse {
  animation-name: orbit-spin-reverse;
}

/* --- PLANETS --- */
.planet {
  position: absolute;
  top: 50%;
  left: -22px; /* starting on the visible half (your cut system) */
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background-color: var(--planet-color);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 8px rgba(15, 23, 42, 0.6),
    0 0 18px rgba(15, 23, 42, 0.3);
}

/* Icon directly on planet */
.icon {
  color: #ffffff;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
}

/* --- ANIMATIONS --- */
@keyframes sunPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.07); }
}

.sun-pulse {
  animation: sunPulse 4s ease-in-out infinite;
}

@keyframes orbit-spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes orbit-spin-reverse {
  0% { transform: translate(-50%, -50%) rotate(360deg); }
  100% { transform: translate(-50%, -50%) rotate(0deg); }
}
</style>
