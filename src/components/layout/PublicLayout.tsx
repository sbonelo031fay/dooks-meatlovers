import { Outlet } from 'react-router-dom';
import { useBusinessSettings } from '../../features/business/useBusinessSettings';
import { Footer } from './Footer';
import { Header } from './Header';

export function PublicLayout() {
  const { settings } = useBusinessSettings();

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-orange-50 overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-orange-700 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-orange-50"
      >
        Skip to main content
      </a>

      <Header
        displayName={settings.displayName}
        isSampleData={settings.isSampleData}
      />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
