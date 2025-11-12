<template>
  <section class="min-h-screen bg-sb-main text-sb-contrast p-10 space-y-16">
    <!-- ======================= -->
    <!-- HERO / IMPACT TITLE -->
    <!-- ======================= -->
    <div class="space-y-4 text-center">
      <h1 class="ty-sb-hero text-balance">
        TITOLONE D’IMPATTO
      </h1>
      <p class="ty-sb-paragraph max-w-2xl mx-auto text-sb-muted">
        Tipografia principale per le sezioni hero. Per titoli secondari molto grandi usa <code>.ty-sb-title-xl</code>
        oppure <code>.ty-sb-impact</code> per un look più “bold”.
      </p>
    </div>

    <hr class="border-sb-border my-10" />

    <!-- ======================= -->
    <!-- CARD TITLES -->
    <!-- ======================= -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Card 1: Title LG + Subtitle LG -->
      <div class="bg-sb-surface p-6 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)]">
        <h2 class="ty-sb-title-lg">
          Titolo Card
        </h2>
        <p class="ty-sb-subtitle-lg text-sb-muted mt-1">
          Sottotitolo card
        </p>
        <p class="ty-sb-paragraph mt-4">
          Testo descrittivo in Space Mono. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <!-- Card 2: Title XL + Subtitle XL -->
      <div class="bg-sb-surface-2 p-6 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)]">
        <h2 class="ty-sb-title-xl">
          Card Alternativa
        </h2>
        <p class="ty-sb-subtitle-xl text-sb-muted mt-1">
          Subtitle elegante
        </p>
        <p class="ty-sb-paragraph mt-4">
          Ottima leggibilità anche su schermi piccoli. Font monospazio, line-height comoda.
        </p>
      </div>

      <!-- Card 3: Title base + Subtitle base (di riferimento) -->
      <div class="bg-sb-surface-2 p-6 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)]">
        <h2 class="ty-sb-title">
          Titolo Terza Card
        </h2>
        <p class="ty-sb-subtitle text-sb-muted mt-1">
          Sub minimal
        </p>
        <p class="ty-sb-paragraph mt-4">
          Perfetto per descrizioni di progetti, card del portfolio o tool.
        </p>
      </div>
    </div>

    <hr class="border-sb-border my-10" />

    <!-- ======================= -->
    <!-- PARAGRAPHS & LABELS -->
    <!-- ======================= -->
    <div class="max-w-3xl mx-auto space-y-6">
      <h3 class="ty-sb-title-lg text-center">
        Testi e Label
      </h3>
      <p class="ty-sb-paragraph">
        Esempio di paragrafo in <strong>Space Mono</strong>. Line-height rilassata, adatta per body text.
      </p>

      <div class="space-y-3">
        <label class="ty-sb-label block text-sb-muted">Etichetta Form</label>
        <input
          class="w-full rounded-lg bg-sb-surface-2 border border-sb-border px-4 py-2 text-sb-contrast ty-sb-paragraph focus:outline-none focus:ring-2 focus:ring-sb-accent"
          placeholder="Inserisci qualcosa..."
          type="text"
        />
      </div>
    </div>

    <hr class="border-sb-border my-10" />

    <!-- ======================= -->
    <!-- BUTTONS -->
    <!-- ======================= -->
    <div class="flex flex-wrap justify-center gap-6">
      <!-- Primary -->
      <button class="ty-sb-btn-label bg-sb-accent hover:bg-sb-accent-hover px-6 py-3 rounded-xl text-sb-contrast transition">
        Primary Button
      </button>

      <!-- Secondary (filled surface) -->
      <button class="ty-sb-btn-label bg-sb-surface-2 hover:bg-sb-surface px-6 py-3 rounded-xl text-sb-contrast border border-sb-border transition">
        Secondary
      </button>

      <!-- Outline -->
      <button class="ty-sb-btn-label bg-transparent border border-sb-accent text-sb-accent hover:bg-sb-accent hover:text-sb-main px-6 py-3 rounded-xl transition">
        Outline
      </button>
    </div>
  </section>
</template>
