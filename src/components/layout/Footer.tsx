import { Link } from 'react-router-dom';
import {
  BusinessSettings,
  buildWhatsAppEnquiryUrl,
} from '../../features/business/types';

interface FooterProps {
  settings: BusinessSettings;
}

export function Footer({ settings }: FooterProps) {
  const whatsappUrl = buildWhatsAppEnquiryUrl(
    settings.whatsappNumber,
    'Hi Dooks Meatlovers! I have a question about your menu.',
  );

  return (
    <footer className="border-t border-stone-800 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-orange-50">
              {settings.displayName}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-300">
              {settings.tagline}
            </p>
            {settings.instagramUrl && (
              <p className="mt-3 text-sm">
                Instagram:{' '}
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-400 underline hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded"
                >
                  {settings.instagramHandle ?? '@dooks_meatlover'}
                </a>
              </p>
            )}
          </div>

          <div>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-orange-50">
              Quick Links
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="inline-block py-1 text-stone-300 hover:text-orange-100 underline-offset-4 hover:underline"
                >
                  Home &amp; Featured Specials
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="inline-block py-1 text-stone-300 hover:text-orange-100 underline-offset-4 hover:underline"
                >
                  Full BBQ &amp; Bakery Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/#custom-cakes"
                  className="inline-block py-1 text-stone-300 hover:text-orange-100 underline-offset-4 hover:underline"
                >
                  Custom Cake Quotes
                </Link>
              </li>
              <li>
                <Link
                  to="/#visit-us"
                  className="inline-block py-1 text-stone-300 hover:text-orange-100 underline-offset-4 hover:underline"
                >
                  Location &amp; Opening Hours
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-orange-50">
              Enquiries &amp; Privacy Note
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-stone-400">
              We do not collect customer accounts, cookies, or payment details on
              this website. Clicking a WhatsApp enquiry opens a prefilled chat on
              WhatsApp that you choose to send directly to our team.
            </p>
            <div className="mt-4">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-orange-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-50 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Chat on WhatsApp
                </a>
              ) : (
                <span className="inline-flex min-h-[44px] items-center rounded-lg border border-stone-700 bg-stone-800/80 px-3.5 py-2 text-xs font-medium text-stone-300">
                  WhatsApp Line Pending Owner Confirmation
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} {settings.displayName}. All rights
            reserved.
          </p>
          <Link
            to="/admin/login"
            className="text-stone-400 hover:text-stone-200 underline underline-offset-4"
          >
            Owner Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
