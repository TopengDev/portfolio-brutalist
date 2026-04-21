"use client";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-line)] bg-[color:var(--color-ink)]/90 backdrop-blur-[2px]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em]">
            CI / BUILDER
          </span>
          <span className="section-index hidden md:inline">Jakarta · ID</span>
        </div>
        <nav className="flex items-center gap-5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em]">
          <a href="#work" className="link">Work</a>
          <a href="#now" className="link">Now</a>
          <a href="#uses" className="link">Uses</a>
          <a href="#contact" className="link link-accent">Contact</a>
        </nav>
      </div>
    </header>
  );
}
