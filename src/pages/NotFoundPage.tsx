import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <div className="rounded-2xl border border-stone-800 bg-stone-900 p-8 sm:p-12 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          404 — Page Not Found
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold uppercase tracking-wide text-orange-50">
          Nothing Smoking on This Grill
        </h1>
        <p className="mt-4 text-sm sm:text-base text-stone-300">
          The page you are looking for doesn&apos;t exist or may have moved. Head
          back to the homepage or browse our full BBQ and bakery menu.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-orange-700 px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-orange-50 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Back to Homepage
          </Link>
          <Link
            to="/menu"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-stone-700 bg-stone-950 px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-orange-100 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
