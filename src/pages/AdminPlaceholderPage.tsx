import { Link } from 'react-router-dom';

interface AdminPlaceholderPageProps {
  title: string;
}

export function AdminPlaceholderPage({ title }: AdminPlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="rounded-2xl border border-stone-800 bg-stone-900 p-8 shadow-xl">
        <span className="inline-block rounded bg-orange-700 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-50">
          Owner Portal (Scheduled for Milestone 4)
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide text-orange-50">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-300">
          Firebase Authentication, active admin verification (
          <code className="text-amber-300">admins/&#123;uid&#125;.active</code>),
          and menu/business management forms are scheduled for Milestone 4.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-stone-700 bg-stone-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-orange-100 hover:bg-stone-800"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
