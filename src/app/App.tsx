export function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-orange-50 flex flex-col justify-between">
      <header className="border-b border-stone-800 bg-stone-900/90 px-4 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div>
            <span className="font-display text-2xl font-bold tracking-wide uppercase text-orange-100">
              Dooks Meatlovers
            </span>
            <span className="ml-3 inline-block rounded bg-orange-700 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-orange-50">
              Milestone 1 Foundation
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 flex-1">
        <section className="rounded-xl border border-stone-800 bg-stone-900 p-6 sm:p-10 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            South African BBQ Deli &amp; Bakery
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-orange-50">
            Smoked Brisket, Loaded Kotas, Sharing Platters &amp; Custom Cakes
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-stone-300">
            Portable React + TypeScript + Tailwind foundation initialized. Public
            routes, labelled sample fixtures, and menu views are scheduled next
            in Milestone 2.
          </p>
        </section>
      </main>

      <footer className="border-t border-stone-800 bg-stone-900 px-4 py-6 text-center text-sm text-stone-400">
        <p>
          Dooks Meatlovers — Development Preview (Contact details &amp; hours
          pending owner confirmation in{' '}
          <code className="text-orange-200">docs/content-checklist.md</code>)
        </p>
      </footer>
    </div>
  );
}

export default App;
