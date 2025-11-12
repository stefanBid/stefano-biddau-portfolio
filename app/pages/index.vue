<template>
  <div>
    <!-- Welcome Hero Section -->
    <section class="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
      <!-- Hero image -->
      <NuxtImg
        alt="Hero"
        class="absolute w-60 sm:w-72 md:w-80 lg:w-96 xl:w-96 h-auto left-1/2 transform -translate-x-1/2 pointer-events-none animate-scale-fade u-sb-soft-transition z-0"
        provider="cloudinary"
        src="v1762793798/my-avatar_dmchkt.webp"
      />

      <!-- Title with local overlay -->
      <div class="relative z-10 inline-block  animate-fade-in opacity-0">
        <!-- overlay only behind the text -->
        <div
          class="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-sb-main/80 via-sb-main/50 to-sb-main/80 blur-sm"
        ></div>

        <h1
          class="ty-sb-hero bg-linear-to-r from-sb-accent to-sb-contrast bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] u-sb-soft-transition px-6 py-2"
        >
          Welcome Back
        </h1>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===================== Animations ===================== */

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes scale-fade {
  0% {
    opacity: 0;
    transform:  scale(0.9);
  }
  100% {
    opacity: 1;
    transform:  scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out 0.5s forwards; /* 0.5s delay */
}

.animate-scale-fade {
  animation: scale-fade 1.8s ease-out forwards;
}
</style>
