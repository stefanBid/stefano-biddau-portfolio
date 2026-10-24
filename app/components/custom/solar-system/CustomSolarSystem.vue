<script setup lang="ts">
import type { SkillTier, SkillTierGroup } from '~/composables/data/useSkills'

interface CustomSolarSystemProps {
  tiers: SkillTierGroup[]
  activeId?: string | null
}

// Input / Output
const props = withDefaults(defineProps<CustomSolarSystemProps>(), {
  activeId: null,
})

// Data
// Orbit distance is the data: the closer to the sun, the more often the skill is used
const ORBITS: Record<SkillTier, { ratio: number, duration: number, direction: 'normal' | 'reverse' }> = {
  daily: { ratio: 0.46, duration: 70, direction: 'normal' },
  shipped: { ratio: 0.7, duration: 110, direction: 'reverse' },
  familiar: { ratio: 0.94, duration: 160, direction: 'normal' },
}

const orbits = computed(() => props.tiers.map((tier, tierIndex) => ({
  key: tier.key,
  style: {
    '--orbit-ratio': ORBITS[tier.key].ratio,
    '--orbit-duration': `${ORBITS[tier.key].duration}s`,
    '--orbit-direction': ORBITS[tier.key].direction,
  },
  planets: tier.skills.map((skill, index) => ({
    id: skill.id,
    icon: skill.icon,
    onLight: skill.onLight,
    style: {
      '--slot-angle': `${(360 / tier.skills.length) * index + tierIndex * 23}deg`,
    },
  })),
})))
</script>

<template>
  <!-- Rotating orbits have square bounding boxes wider than the circle drawn; the frame clips them -->
  <div aria-hidden="true" class="solar-system-frame">
    <div class="solar-system relative w-full aspect-square">
      <div class="sun">
        <div class="sun-glow"></div>
        <div class="sun-corona"></div>
        <div class="sun-core"></div>
        <div class="sun-flare"></div>
      </div>

      <div
        v-for="orbit in orbits"
        :key="orbit.key"
        class="orbit"
        :class="`orbit--${orbit.key}`"
        :style="orbit.style"
      >
        <div
          v-for="planet in orbit.planets"
          :key="planet.id"
          class="slot"
          :style="planet.style"
        >
          <div
            class="planet"
            :class="{
              'is-active': props.activeId === planet.id,
              'is-dimmed': props.activeId && props.activeId !== planet.id,
            }"
          >
            <div class="planet-upright">
              <div class="planet-counter">
                <div class="planet-body" :class="{ 'planet-body--light': planet.onLight }">
                  <Icon class="planet-icon" :name="planet.icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.solar-system-frame {
  overflow: hidden;
  padding: 24px;
}

.solar-system {
  container-type: inline-size;
  --planet-size: clamp(28px, 8.5cqi, 40px);
}

/* --- SUN --- */

.sun {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 28%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  animation: sunPulse 4s ease-in-out infinite;
  z-index: 3;
}

@keyframes sunPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.04); }
}

.sun-glow {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: radial-gradient(circle, var(--sb-sun-200) 0%, var(--sb-sun-500) 55%, transparent 100%);
  filter: blur(14px);
  opacity: 0.8;
}

.sun-corona {
  position: absolute;
  inset: 7%;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--sb-sun-corona-inner) 45%, transparent) 0%,
    color-mix(in oklab, var(--sb-sun-corona-mid) 22%, transparent) 45%,
    color-mix(in oklab, var(--sb-sun-corona-outer) 8%, transparent) 80%,
    transparent 100%
  );
  filter: blur(6px);
  animation: coronaPulse 6s ease-in-out infinite;
}

@keyframes coronaPulse {
  0%, 100% { opacity: 0.75; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.06); }
}

.sun-core {
  position: absolute;
  inset: 19%;
  border-radius: 9999px;
  background: radial-gradient(circle, var(--sb-sun-100) 0%, var(--sb-sun-200) 55%, var(--sb-sun-400) 100%);
}

.sun-flare {
  position: absolute;
  inset: 14%;
  border-radius: 9999px;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    color-mix(in oklab, var(--sb-sun-250) 18%, transparent) 40deg,
    transparent 80deg,
    transparent 180deg,
    color-mix(in oklab, var(--sb-sun-300) 16%, transparent) 220deg,
    transparent 260deg
  );
  mix-blend-mode: screen;
  animation: spin 28s linear infinite;
}

/* --- ORBITS --- */

.orbit {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--orbit-ratio) * 100%);
  aspect-ratio: 1;
  border-radius: 9999px;
  border: 1px solid color-mix(in oklab, var(--sb-orbit) 30%, transparent);
  transform: translate(-50%, -50%);
  animation: orbitSpin var(--orbit-duration) linear infinite;
  animation-direction: var(--orbit-direction);
  z-index: 2;
}

@keyframes orbitSpin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* --- PLANETS --- */

.slot {
  position: absolute;
  inset: 0;
  transform: rotate(var(--slot-angle));
}

.planet {
  position: absolute;
  left: 50%;
  top: 0;
  width: var(--planet-size);
  height: var(--planet-size);
  translate: -50% -50%;
  transition:
    scale var(--sb-duration-state) var(--ease-out),
    opacity var(--sb-duration-state) var(--ease-out);
}

.planet.is-active {
  scale: 1.3;
  z-index: 1;
}

.planet.is-dimmed {
  opacity: 0.3;
}

/* Undo the slot angle, then counter-spin against the orbit, so logos stay upright */
.planet-upright {
  width: 100%;
  height: 100%;
  transform: rotate(calc(-1 * var(--slot-angle)));
}

.planet-counter {
  width: 100%;
  height: 100%;
  animation: orbitCounter var(--orbit-duration) linear infinite;
  animation-direction: var(--orbit-direction);
}

@keyframes orbitCounter {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.planet-body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  border: 1px solid var(--sb-border-strong);
  background-color: var(--sb-surface-2);
  box-shadow: 0 2px 6px color-mix(in oklab, var(--sb-planet-shadow) 70%, transparent);
  transition: box-shadow var(--sb-duration-state) var(--ease-out);
}

.planet-body--light {
  background-color: var(--sb-ink);
}

.orbit--daily .planet-body {
  border-color: color-mix(in oklab, var(--sb-gold-200) 60%, transparent);
  background: radial-gradient(circle at 30% 0%, var(--sb-gold-100) 0, var(--sb-gold-400) 45%, var(--sb-gold-800) 100%);
}

.planet.is-active .planet-body {
  box-shadow:
    0 0 0 2px var(--sb-bg),
    0 0 0 4px var(--sb-primary);
}

.planet-icon {
  width: 60%;
  height: 60%;
  color: var(--sb-ink);
  filter: drop-shadow(0 0 2px var(--sb-shadow-color));
}

@media (prefers-reduced-motion: reduce) {
  .solar-system *,
  .solar-system *::before,
  .solar-system *::after {
    animation-play-state: paused !important;
  }
}
</style>
