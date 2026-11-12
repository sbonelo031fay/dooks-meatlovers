import { createContext, useContext, useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, CakeSlice, Check, ChefHat, Clipboard, Flame, Heart, Instagram, Leaf, MapPin, Menu as MenuIcon, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Utensils, X } from 'lucide-react';
import { Modal } from '../components/Modal';
import { MenuCard } from '../components/MenuCard';
import { categories, type EnquiryLine, type MenuItem } from '../features/menu/types';
import { filterMenu, formatPrice } from '../features/menu/menu';
import { useMenu } from '../features/menu/useMenu';
import { isDemoMode } from '../repositories/menuRepository';

function readStored<T>(key: string, fallback: T, validate: (value: unknown) => boolean): T {
  try { const value: unknown = JSON.parse(localStorage.getItem(key) ?? 'null'); return validate(value) ? value as T : fallback; } catch { return fallback; }
}
type Store = ReturnType<typeof useMenu> & {
  saved: string[]; toggleSaved(id: string): void; lines: EnquiryLine[];
  addItem(id: string): void; changeQuantity(id: string, quantity: number): void;
  openItem(item: MenuItem): void; openBag(): void;
};
const ShopContext = createContext<Store | null>(null);
function useShop() { const value = useContext(ShopContext); if (!value) throw new Error('Shop provider missing'); return value; }

export function App() {
  const menu = useMenu();
  const [saved, setSaved] = useState<string[]>(() => readStored('dooks.saved.v1', [], x => Array.isArray(x) && x.every(i => typeof i === 'string')));
  const [lines, setLines] = useState<EnquiryLine[]>([]);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [toast, setToast] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const location = useLocation();
  useEffect(() => { try { localStorage.setItem('dooks.saved.v1', JSON.stringify(saved)); } catch { /* Browsing works without storage. */ } }, [saved]);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  function notify(message: string) { clearTimeout(timer.current); setToast(message); timer.current = setTimeout(() => setToast(''), 3000); }
  function toggleSaved(id: string) { setSaved(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]); }
  function addItem(id: string) {
    const item = menu.items.find(x => x.id === id);
    if (!item || item.soldOut) return;
    setLines(current => current.some(x => x.id === id) ? current.map(x => x.id === id ? { ...x, quantity: Math.min(x.quantity + 1, 20) } : x) : [...current, { id, quantity: 1 }]);
    notify(`${item.name} added to your enquiry`);
  }
  function changeQuantity(id: string, quantity: number) { setLines(current => quantity <= 0 ? current.filter(x => x.id !== id) : current.map(x => x.id === id ? { ...x, quantity: Math.min(quantity, 20) } : x)); }
  const store = { ...menu, saved, toggleSaved, lines, addItem, changeQuantity, openItem: setSelected, openBag: () => setBagOpen(true) };
  return <ShopContext.Provider value={store}>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main"><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="*" element={<div className="empty-state page-container"><span className="eyebrow">A little off the menu</span><h1>Nothing cooking here.</h1><Link className="button primary" to="/menu">Back to the menu <ArrowRight size={18} /></Link></div>} />
    </Routes></main>
    <Footer />
    <div className={`toast ${toast ? 'visible' : ''}`} role="status">{toast && <><Check size={18} />{toast}</>}</div>
    {selected && <Modal title={selected.name} onClose={() => setSelected(null)}>
      <img className="detail-image" src={selected.image.url} alt={selected.image.alt} width="700" height="500" />
      <div className="detail-body"><span className="eyebrow">{categories.find(x => x.id === selected.category)?.label}</span><h2>{selected.name}</h2><p>{selected.description}</p><div className="detail-price">{formatPrice(selected.pricing)}</div>
        <p className="fine-print">{isDemoMode ? 'Private preview: poster guide prices, example descriptions and stock status. Confirm current pricing, ingredients and availability with the kitchen.' : 'Please confirm ingredients, allergens and availability with the kitchen.'}</p>
        <button className="button primary full" disabled={selected.soldOut} onClick={() => { addItem(selected.id); setSelected(null); }}>{selected.soldOut ? 'Currently sold out' : 'Add to my enquiry'}<Plus size={18} /></button>
      </div>
    </Modal>}
    {bagOpen && <EnquiryDrawer onClose={() => setBagOpen(false)} />}
  </ShopContext.Provider>;
}

function Brand() { return <span className="brand"><span className="brand-name">DOOKS<span className="brand-flame"><Flame size={22} fill="currentColor" /></span></span><span className="brand-sub">MEATLOVERS</span></span>; }
function Header() {
  const { saved, lines, openBag } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMobileOpen(false), [location]);
  return <>
    {isDemoMode && <div className="preview-notice"><span className="preview-dot" />PRIVATE PREVIEW <span className="notice-divider">/</span><span>Poster guide prices. Current menu to be confirmed.</span></div>}
    <header className="site-header"><div className="header-content page-container">
      <Link className="brand-link" to="/" aria-label="Dooks Meatlovers home"><Brand /></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/menu">Our menu</NavLink><Link to="/#cakes">Custom cakes</Link><Link to="/#our-story">Our story</Link><Link to="/#visit">Find us</Link></nav>
      <div className="header-actions"><Link className="icon-button saved-nav" to="/menu?saved=1" aria-label={`Saved favourites, ${saved.length} items`}><Heart size={21} />{saved.length > 0 && <span className="count-dot">{saved.length}</span>}</Link>
        <button className="enquiry-button" onClick={openBag} aria-label={`Open enquiry list, ${lines.reduce((n, x) => n + x.quantity, 0)} items`}><ShoppingBag size={18} /><span>My enquiry</span><b>{lines.reduce((n, x) => n + x.quantity, 0)}</b></button>
        <button className="icon-button menu-toggle" onClick={() => setMobileOpen(x => !x)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-nav">{mobileOpen ? <X /> : <MenuIcon />}</button>
      </div>
    </div>
    {mobileOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation"><Link to="/">Home</Link><Link to="/menu">Our menu <ArrowUpRight size={19} /></Link><Link to="/#cakes">Custom cakes</Link><Link to="/#our-story">Our story</Link><Link to="/#visit">Find us</Link><Link to="/menu?saved=1">Saved favourites ({saved.length})</Link></nav>}
    </header>
  </>;
}

function assetUrl(path: string): string {
  return `${(import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

function HomePage() {
  return <>
    <section className="hero"><div className="hero-layout page-container">
      <div className="hero-copy"><div className="eyebrow hero-eyebrow"><span />WOOD-SMOKED. LOCALLY LOVED.</div>
        <h1>LOW. SLOW.<br /><span>ALL SOUL.</span></h1><p>Proper BBQ. Fully loaded kotas. Something sweet.<br className="desktop-only" /> Welcome to the Dooks family table.</p>
        <div className="hero-actions"><Link className="button primary" to="/menu">Find your flavour <ArrowUpRight size={19} /></Link><Link className="text-link" to="/#our-story">A little about us <ArrowRight size={17} /></Link></div>
        <div className="hero-footnote"><Flame size={20} /><span>From our smoker to your plate.</span><span className="hero-footnote-line" /></div>
      </div>
      <div className="hero-photo"><img src={assetUrl('/images/burger.webp')} alt="Dooks wood-smoked brisket burger in a sesame bun" width="700" height="645" fetchPriority="high" /><div className="photo-shade" />
        <div className="round-stamp"><Flame size={24} /><span>BIG FLAVOUR</span><i>no shortcuts.</i></div>
        <div className="hero-photo-caption"><span>THE SMOKED BRISKET BURGER</span><Link to="/menu?search=brisket">Meet your next favourite <ArrowUpRight size={18} /></Link></div>
      </div>
    </div></section>
    <div className="flavour-strip"><span>SMOKED LOW & SLOW</span><Sparkles size={17} /><span>LOADED WITH FLAVOUR</span><Sparkles size={17} /><span>BAKED WITH LOVE</span><Sparkles size={17} /><span>MADE TO SHARE</span><Sparkles size={17} /></div>
    <MenuBrowser />
    <StorySection />
    <CakeSection />
    <VisitSection />
  </>;
}

function MenuPage() { return <><div className="menu-page-intro page-container"><Link className="breadcrumb" to="/">Home</Link><span className="breadcrumb"> / Our menu</span></div><MenuBrowser standalone /><VisitSection /></>; }

function MenuBrowser({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  const { items, status, retry, saved, toggleSaved, lines, addItem, openItem } = useShop();
  const [params, setParams] = useSearchParams();
  const category = categories.some(x => x.id === params.get('category')) ? params.get('category')! : 'all';
  const search = params.get('search') ?? '';
  const savedOnly = params.get('saved') === '1';
  const availableOnly = params.get('available') === '1';
  const sort = params.get('sort') ?? 'featured';
  const filtered = filterMenu(items, { category, search, savedOnly, saved, availableOnly, sort });
  function setFilter(key: string, value: string) { const next = new URLSearchParams(window.location.search); value ? next.set(key, value) : next.delete(key); setParams(next, { replace: true, preventScrollReset: true }); }
  function reset() { setParams({}, { replace: true, preventScrollReset: true }); }
  return <section className={`menu-section page-container ${standalone ? 'standalone-menu' : ''}`} id="menu">
    <div className="section-heading"><div><span className="eyebrow"><Utensils size={15} />THE GOOD STUFF</span><Heading>{savedOnly ? <>YOUR SAVED <em>FAVOURITES.</em></> : <>WHAT ARE YOU <em>CRAVING?</em></>}</Heading></div><p>A proper feed, whatever your mood.<br />Find something that hits the spot.</p></div>
    <div className="category-filters" aria-label="Menu categories">{categories.map((x, index) => <button key={x.id} className={category === x.id ? 'category active' : 'category'} aria-pressed={category === x.id} onClick={() => setFilter('category', x.id === 'all' ? '' : x.id)}>{index === 0 ? <Utensils size={16} /> : index === 1 ? <Flame size={16} /> : index === 5 ? <CakeSlice size={17} /> : null}{x.label}{category === x.id && <span>{items.filter(i => x.id === 'all' || i.category === x.id).length}</span>}</button>)}</div>
    <div className="menu-toolbar"><label className="search-input"><Search size={19} /><span className="sr-only">Search the menu</span><input aria-label="Search the menu" value={search} onChange={e => setFilter('search', e.target.value)} placeholder="Find your next favourite…" type="search" />{search && <button className="clear-search" aria-label="Clear search" onClick={() => setFilter('search', '')}><X size={17} /></button>}</label>
      <div className="toolbar-controls"><button className={`filter-chip ${savedOnly ? 'selected' : ''}`} aria-pressed={savedOnly} onClick={() => setFilter('saved', savedOnly ? '' : '1')}><Heart size={16} fill={savedOnly ? 'currentColor' : 'none'} />Saved{saved.length ? ` (${saved.length})` : ''}</button>
      <label className="sort-label"><SlidersHorizontal size={16} /><span className="sr-only">Sort menu</span><select value={sort} onChange={e => setFilter('sort', e.target.value)}><option value="featured">Dooks favourites</option><option value="price">Price: low to high</option><option value="name">Name: A–Z</option></select></label></div>
    </div>
    <div className="menu-meta"><span role="status">{status === 'ready' ? `${filtered.length} ${filtered.length === 1 ? 'dish' : 'dishes'} to discover` : status === 'loading' ? 'Getting the menu ready…' : 'Menu unavailable'}</span><label><input type="checkbox" checked={availableOnly} onChange={e => setFilter('available', e.target.checked ? '1' : '')} />Hide sold-out items</label></div>
    {status === 'loading' && <div className="food-grid" aria-busy="true" aria-label="Loading menu">{[1, 2, 3].map(x => <div className="skeleton" key={x} />)}</div>}
    {status === 'error' && <div className="empty-state" role="alert"><ChefHat size={36} /><h3>The menu needs a moment.</h3><p>We couldn’t load the menu. Please try again.</p><button className="button primary" onClick={retry}>Try again <ArrowRight size={17} /></button></div>}
    {status === 'ready' && filtered.length === 0 && <div className="empty-state"><Search size={34} /><h3>{savedOnly ? 'Your next favourite is waiting.' : 'Nothing on this plate yet.'}</h3><p>{savedOnly ? 'Tap a heart on any dish to save it, or adjust your filters.' : 'Try another search or clear your filters to explore the whole menu.'}</p><button className="button primary" onClick={reset}>Explore all dishes <ArrowRight size={17} /></button></div>}
    {status === 'ready' && <div className="food-grid">{filtered.map(item => <MenuCard key={item.id} item={item} saved={saved.includes(item.id)} added={lines.some(x => x.id === item.id)} onSave={() => toggleSaved(item.id)} onOpen={() => openItem(item)} onAdd={() => addItem(item.id)} />)}</div>}
    <p className="menu-disclaimer"><Leaf size={15} />{isDemoMode ? 'A taste of the menu from our brand posts. Guide prices, sample descriptions and stock status need owner confirmation.' : 'Please ask the kitchen about current availability, ingredients and allergens.'}</p>
  </section>;
}

function StorySection() { return <section className="story-section" id="our-story"><div className="story-grid page-container"><div className="story-photo"><img src={assetUrl('/images/brisket.webp')} alt="Sliced Dooks smoked brisket with a dark bark" width="468" height="570" loading="lazy" /><span className="photo-label">SMOKE. PATIENCE. PASSION.</span></div><div className="story-copy"><span className="eyebrow">PULL UP A CHAIR</span><h2>GOOD FOOD.<br />A <em>FAMILY THING.</em></h2><p>Dooks is where wood-smoked BBQ meets the food we love coming home to. Big kotas, generous platters and a little bakery magic — all at the same table.</p><p>We’re a family-run South African kitchen with a simple idea: take your time with the food, and make it something worth sharing.</p><div className="story-values"><span><Flame />Low & slow</span><span><Heart />Family-run</span><span><Utensils />Made to share</span></div><a className="text-link" href="https://www.instagram.com/dooks_meatlover/" target="_blank" rel="noreferrer">Follow the kitchen <Instagram size={18} /></a></div></div></section>; }

function CakeSection() {
  const [formOpen, setFormOpen] = useState(false);
  return <section className="cake-section page-container" id="cakes"><div className="cake-content"><span className="eyebrow"><CakeSlice size={16} />A LITTLE SOMETHING SWEET</span><h2>YOUR OCCASION.<br /><em>OUR NEXT CREATION.</em></h2><p>Big birthdays. Small celebrations. Your kind of cake.<br />Tell us what you’re imagining — we’ll start there.</p><button className="button primary" onClick={() => setFormOpen(true)}>Let’s plan a cake <ArrowUpRight size={18} /></button><small>Made to order. Individually quoted. Always personal.</small></div><div className="cake-photo"><img src={assetUrl('/images/cake.webp')} alt="Dooks custom celebration cake decorated with gold flowers" width="700" height="666" loading="lazy" /><span className="cake-note">Something worth<br /><i>celebrating.</i></span></div>{formOpen && <CakePlanner onClose={() => setFormOpen(false)} />}</section>;
}

function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const ref = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(ref.current), []);
  async function copy() {
    try { await navigator.clipboard.writeText(text); setState('copied'); clearTimeout(ref.current); ref.current = setTimeout(() => setState('idle'), 2500); }
    catch { setState('failed'); }
  }
  return <><button className="button primary full" onClick={copy}>{state === 'copied' ? <Check size={18} /> : <Clipboard size={18} />}{state === 'copied' ? 'Copied to clipboard' : 'Copy enquiry'}</button><span className="copy-status" role="status">{state === 'failed' ? 'Copy is unavailable in this browser. Select and copy the message above.' : state === 'copied' ? 'Your message is ready to paste.' : ''}</span></>;
}

function CakePlanner({ onClose }: { onClose(): void }) {
  const [draft, setDraft] = useState('');
  const [values, setValues] = useState({ occasion: '', date: '', servings: '', idea: '' });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setValues({ occasion: String(data.get('occasion')), date: String(data.get('date')), servings: String(data.get('servings')), idea: String(data.get('idea') ?? '') });
    setDraft(`Hi Dooks! I’d love a quote for a custom cake.\nOccasion: ${data.get('occasion')}\nDate needed: ${data.get('date')}\nApproximate servings: ${data.get('servings')}\nCake idea: ${String(data.get('idea') || 'I’d love some suggestions!').trim()}\nPlease let me know about availability, pricing and lead time. Thank you!`);
  }
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return <Modal title="Cake planner" onClose={onClose}><div className="planner-body"><span className="eyebrow">LET’S MAKE IT YOURS</span><h2>PLAN A LITTLE<br /><em>CAKE MAGIC.</em></h2>{!draft ? <form className="cake-form" onSubmit={submit}><label>What’s the occasion?<select name="occasion" defaultValue={values.occasion} required><option value="">Choose an occasion</option><option>Birthday</option><option>Anniversary</option><option>Graduation</option><option>Just celebrating</option><option>Other celebration</option></select></label><div className="form-row"><label>When do you need it?<input name="date" type="date" defaultValue={values.date} min={today} required /></label><label>Approx. servings<input name="servings" type="number" defaultValue={values.servings} min="1" max="500" placeholder="e.g. 12" required /></label></div><label>Your cake idea<textarea name="idea" defaultValue={values.idea} maxLength={600} rows={3} placeholder="Flavours, colours, a theme… Dream a little." /></label><p className="fine-print">This creates a message for you to copy. It doesn’t submit a request, save your details or confirm a booking.</p><button className="button primary full" type="submit">Create my enquiry <ArrowRight size={18} /></button></form> : <><p>Your cake idea, ready to share.</p><label className="draft-label">Enquiry message<textarea className="draft-message" readOnly value={draft} rows={10} onFocus={e => e.currentTarget.select()} /></label><CopyButton text={draft} /><button className="button secondary full" onClick={() => setDraft('')}>Edit cake details</button><p className="fine-print">WhatsApp will be enabled after the owner confirms contact details. No request has been sent.</p></>}</div></Modal>;
}

function EnquiryDrawer({ onClose }: { onClose(): void }) {
  const { items, lines, changeQuantity } = useShop();
  const content = lines.flatMap(line => { const item = items.find(x => x.id === line.id); return item ? [{ ...line, item }] : []; });
  const message = `Hi Dooks! I’d like to enquire about:\n${content.map(x => `• ${x.quantity} × ${x.item.name}`).join('\n')}\nPlease confirm current prices, availability and collection details. Thank you!`;
  const guideTotal = content.reduce((total, x) => total + (x.item.pricing.amountCents ?? 0) * x.quantity, 0);
  return <Modal title="My enquiry" onClose={onClose} drawer><div className="bag-body"><span className="eyebrow">SOMETHING GOOD IS BREWING</span><h2>YOUR <em>ENQUIRY.</em></h2><p>Gather your favourites. Ask the kitchen.</p>{content.length ? <><div className="bag-lines">{content.map(x => <div className="bag-line" key={x.id}><img src={x.item.image.url} alt="" width="78" height="78" /><div><h3>{x.item.name}</h3><span>{formatPrice(x.item.pricing)}</span><div className="quantity"><button aria-label={`Remove one ${x.item.name}`} onClick={() => changeQuantity(x.id, x.quantity - 1)}><Minus size={14} /></button><span aria-label="Quantity">{x.quantity}</span><button aria-label={`Add one ${x.item.name}`} onClick={() => changeQuantity(x.id, x.quantity + 1)} disabled={x.quantity >= 20}><Plus size={14} /></button></div></div><button className="icon-button" aria-label={`Remove ${x.item.name}`} onClick={() => changeQuantity(x.id, 0)}><X size={17} /></button></div>)}</div><div className="guide-total"><span>Guide subtotal</span><strong>{new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(guideTotal / 100)}</strong></div><p className="fine-print">Based on historical poster prices. Quoted items excluded. This is an enquiry, with no payment or order confirmation.</p><label className="draft-label">Your message<textarea className="draft-message" readOnly rows={6} value={message} onFocus={e => e.currentTarget.select()} /></label><CopyButton text={message} /><button className="button secondary full" disabled>WhatsApp contact being confirmed</button></> : <div className="empty-state"><ShoppingBag size={42} /><h3>A proper feed starts here.</h3><p>Tap the + on a menu item to add it to your enquiry.</p><button className="button primary" onClick={onClose}>Keep exploring <ArrowRight size={17} /></button></div>}</div></Modal>;
}

function VisitSection() { return <section className="visit-section" id="visit"><div className="visit-grid page-container"><div><span className="eyebrow"><MapPin size={16} />COME HUNGRY</span><h2>A LITTLE LOCAL.<br /><em>A LOT OF FLAVOUR.</em></h2><p>From Folweni, with love.<br />Follow the kitchen for food, pop-ups and what’s cooking.</p><a className="button secondary" href="https://www.instagram.com/dooks_meatlover/" target="_blank" rel="noreferrer"><Instagram size={18} />@dooks_meatlover <ArrowUpRight size={17} /></a></div><div className="visit-details"><div><MapPin size={22} /><div><h3>Find the family table</h3><p>Folweni, KwaZulu-Natal</p><small>Area shown in the supplied brand profile.<br />Exact pin & collection details to be confirmed.</small></div></div><div><ChefHat size={22} /><div><h3>Before you pull through</h3><p>Opening hours & contact details coming soon.</p><small>Current menu, prices and availability need owner confirmation before launch.</small></div></div></div></div></section>; }
function Footer() { return <footer className="site-footer page-container"><Link className="brand-link" to="/" aria-label="Dooks home"><Brand /></Link><p>Smoke in the kitchen. Soul on the plate.</p><div><Link to="/menu">Explore the menu <ArrowUpRight size={16} /></Link><span>© {new Date().getFullYear()} Dooks Meatlovers</span></div></footer>; }
