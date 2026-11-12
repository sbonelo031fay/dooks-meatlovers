import { Link } from 'react-router-dom';
import {
  BusinessSettings,
  buildWhatsAppEnquiryUrl,
  DAY_ORDER,
} from '../features/business/types';
import { useBusinessSettings } from '../features/business/useBusinessSettings';
import { MenuCard } from '../features/menu/MenuCard';
import { MENU_CATEGORY_DESCRIPTIONS, MENU_CATEGORY_LABELS, MenuCategory } from '../features/menu/types';
import { usePublicMenu } from '../features/menu/usePublicMenu';

const CATEGORY_ORDER: MenuCategory[] = [
  'bbq',
  'kotas',
  'platters',
  'bakery',
  'cakes',
];

function VisitSection({ settings }: { settings: BusinessSettings }) {
  return (
    <section
      id="visit-us"
      aria-labelledby="visit-heading"
      className="border-t border-stone-800 bg-stone-900/70 py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Find &amp; Contact Us
          </p>
          <h2
            id="visit-heading"
            className="mt-1 font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide text-orange-50"
          >
            Visit the Smokehouse &amp; Bakery
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-300">
            Pop in for hot wood-smoked brisket, fresh kotas, or pre-arranged
            platter and cake collections.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Location Card */}
          <div className="rounded-xl border border-stone-800 bg-stone-900 p-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-orange-100">
              Location &amp; Directions
            </h3>
            {settings.address ? (
              <p className="mt-3 text-sm text-stone-200">{settings.address}</p>
            ) : (
              <p className="mt-3 text-sm text-stone-400">
                Exact street address pending owner confirmation in{' '}
                <code className="text-amber-200">docs/content-checklist.md</code>.
              </p>
            )}

            <div className="mt-5">
              {settings.mapUrl ? (
                <a
                  href={settings.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-orange-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-50 hover:bg-orange-600"
                >
                  Open in Google Maps
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="min-h-[44px] rounded-lg border border-stone-700 bg-stone-800/80 px-4 py-2 text-xs font-medium text-stone-400 cursor-not-allowed"
                >
                  Map Link Pending Confirmation
                </button>
              )}
            </div>
          </div>

          {/* Direct Contact Card */}
          <div className="rounded-xl border border-stone-800 bg-stone-900 p-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-orange-100">
              WhatsApp &amp; Phone
            </h3>
            <p className="mt-3 text-sm text-stone-300">
              Send us a prefilled WhatsApp message to check daily brisket
              availability or discuss a custom celebration cake.
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <dt className="text-stone-400">WhatsApp:</dt>
                <dd className="font-medium text-orange-100">
                  {settings.whatsappNumber ?? 'To be confirmed'}
                </dd>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <dt className="text-stone-400">Telephone:</dt>
                <dd className="font-medium text-orange-100">
                  {settings.telephone ?? 'To be confirmed'}
                </dd>
              </div>
              <div className="flex justify-between pt-1">
                <dt className="text-stone-400">Instagram:</dt>
                <dd className="font-medium text-amber-400">
                  {settings.instagramHandle ?? '@dooks_meatlover'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Opening Hours Card */}
          <div className="rounded-xl border border-stone-800 bg-stone-900 p-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-orange-100">
              Trading Hours (SAST)
            </h3>
            {settings.openingHours ? (
              <dl className="mt-3 space-y-1.5 text-sm">
                {DAY_ORDER.map(({ key, label }) => {
                  const day = settings.openingHours![key];
                  return (
                    <div
                      key={key}
                      className="flex justify-between border-b border-stone-800/70 py-1 last:border-0"
                    >
                      <dt className="text-stone-300">{label}</dt>
                      <dd className="font-medium text-orange-100">
                        {day.closed
                          ? 'Closed'
                          : `${day.opens ?? '--:--'} – ${day.closes ?? '--:--'}`}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            ) : (
              <div className="mt-3 rounded-lg border border-dashed border-stone-700 bg-stone-950/60 p-4 text-sm text-stone-300">
                <p className="font-semibold text-amber-300">
                  Trading hours pending owner confirmation
                </p>
                <p className="mt-1 text-xs text-stone-400">
                  Monday–Sunday opening and closing times (Africa/Johannesburg)
                  will appear here once confirmed by the family.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const { settings } = useBusinessSettings();
  const { activeSpecials, featuredItems, isLoading, error } = usePublicMenu();

  const cakeQuoteUrl = buildWhatsAppEnquiryUrl(
    settings.whatsappNumber,
    'Hi Dooks Meatlovers! I would like to request a quote for a custom cake (occasion, date, approximate guests, and design idea):',
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative border-b border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-md border border-orange-600/40 bg-orange-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
                South African Smokehouse Deli &amp; Family Bakery
              </span>
              <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-orange-50 leading-none">
                Real Wood Smoke. Towering Kotas. Freshly Baked Daily.
              </h1>
              <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-stone-300">
                From 12-hour smoked beef brisket and generous family sharing
                platters to warm buttermilk scones and custom celebration cakes
                made to order.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/menu"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-orange-700 px-6 py-3 font-display text-base font-bold uppercase tracking-wider text-orange-50 shadow-lg transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-stone-950"
                >
                  Explore Full Menu
                </Link>
                <a
                  href="#custom-cakes"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-stone-700 bg-stone-900 px-6 py-3 font-display text-base font-bold uppercase tracking-wider text-orange-100 transition-colors hover:border-stone-600 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-stone-950"
                >
                  Request a Cake Quote
                </a>
              </div>
            </div>

            {/* Eager-loaded Hero Media Placeholder with Explicit Dimensions */}
            <div className="lg:col-span-5">
              <div
                role="img"
                aria-label="Hero showcase placeholder for Dooks Meatlovers smoked brisket and bakery platters"
                className="aspect-[4/3] w-full rounded-2xl border-2 border-dashed border-stone-700 bg-gradient-to-br from-stone-900 via-stone-950 to-orange-950/40 p-6 flex flex-col items-center justify-center text-center shadow-2xl"
              >
                <span className="rounded-md bg-orange-700 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-50">
                  Hero Photo Placeholder (800 &times; 600)
                </span>
                <p className="mt-3 font-display text-2xl font-bold uppercase text-orange-100">
                  Smoked Brisket, Loaded Kotas &amp; Platters
                </p>
                <p className="mt-2 max-w-xs text-xs text-stone-300">
                  Approved web-optimised photography from @dooks_meatlover will
                  be placed in <code>public/images/</code> (never hotlinked from
                  Instagram).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Highlights Strip */}
      <section
        aria-label="Our core offerings"
        className="border-b border-stone-800 bg-stone-900/50 py-10"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORY_ORDER.map((cat) => (
              <Link
                key={cat}
                to={`/menu?category=${cat}`}
                className="group rounded-xl border border-stone-800 bg-stone-900 p-4 transition-colors hover:border-orange-700/70 hover:bg-stone-800/80 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-orange-100 group-hover:text-amber-400">
                  {MENU_CATEGORY_LABELS[cat]}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-stone-300">
                  {MENU_CATEGORY_DESCRIPTIONS[cat]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Specials Section */}
      <section
        aria-labelledby="specials-heading"
        className="mx-auto max-w-6xl px-4 py-14 sm:px-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Limited-Time Pitmaster Offers
            </p>
            <h2
              id="specials-heading"
              className="mt-1 font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide text-orange-50"
            >
              Featured Smokehouse Specials
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex min-h-[44px] items-center text-sm font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 underline underline-offset-4"
          >
            View Complete Menu &rarr;
          </Link>
        </div>

        {isLoading ? (
          <div
            role="status"
            className="mt-8 rounded-xl border border-stone-800 bg-stone-900 p-8 text-center text-stone-300"
          >
            Loading active specials...
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mt-8 rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-200"
          >
            {error}
          </div>
        ) : activeSpecials.length === 0 ? (
          <div className="mt-8 rounded-xl border border-stone-800 bg-stone-900 p-8 text-center text-stone-300">
            No timed specials are active right now. Browse our full menu for
            daily smoked cuts, kotas, and bakery favourites!
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeSpecials.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                whatsappNumber={settings.whatsappNumber}
              />
            ))}
          </div>
        )}
      </section>

      {/* Signature Menu Preview Section */}
      <section
        aria-labelledby="preview-heading"
        className="border-t border-stone-800 bg-stone-900/30 py-14"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                From the Pit &amp; Oven
              </p>
              <h2
                id="preview-heading"
                className="mt-1 font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide text-orange-50"
              >
                Customer Favourites
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-stone-700 bg-stone-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-orange-100 hover:bg-stone-800"
            >
              Filter All Categories ({featuredItems.length}+ items)
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.slice(0, 6).map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                whatsappNumber={settings.whatsappNumber}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Cake Quote Section */}
      <section
        id="custom-cakes"
        aria-labelledby="cakes-heading"
        className="border-t border-stone-800 bg-gradient-to-r from-stone-900 via-stone-900 to-orange-950/30 py-14"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-stone-700/80 bg-stone-950/80 p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8">
                <span className="inline-block rounded bg-amber-950 border border-amber-500/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Made-to-Order Bakery
                </span>
                <h2
                  id="cakes-heading"
                  className="mt-3 font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide text-orange-50"
                >
                  Custom Celebration &amp; Birthday Cakes
                </h2>
                <p className="mt-3 text-base leading-relaxed text-stone-300">
                  Every celebration cake is baked from scratch and priced
                  according to your size, tiers, sponge flavour, and custom
                  decorations. Tell us about your event and we will put together
                  a personalised quote on WhatsApp.
                </p>
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-200">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">&#10003;</span>
                    Birthdays, graduations &amp; family milestones
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">&#10003;</span>
                    Custom buttercream drips, toppers &amp; themes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">&#10003;</span>
                    No misleading fixed prices — tailored to your brief
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">&#10003;</span>
                    Pair with a Pitmaster BBQ Platter for the full party
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-4 flex flex-col items-stretch sm:items-start lg:items-end justify-center">
                {cakeQuoteUrl ? (
                  <a
                    href={cakeQuoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center rounded-lg bg-orange-700 px-6 py-3 font-display text-base font-bold uppercase tracking-wider text-orange-50 shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    Ask for a Cake Quote on WhatsApp
                  </a>
                ) : (
                  <div className="rounded-xl border border-stone-700 bg-stone-900 p-4 text-left w-full">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      WhatsApp Quote Line Pending Setup
                    </p>
                    <p className="mt-1 text-xs text-stone-300">
                      Once the owner confirms the official WhatsApp number,
                      visitors can launch a prefilled cake quote chat right from
                      here.
                    </p>
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="mt-3 min-h-[44px] w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-400 cursor-not-allowed"
                    >
                      WhatsApp Cake Quote (Pending)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit & Contact Section */}
      <VisitSection settings={settings} />
    </div>
  );
}
