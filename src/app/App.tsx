import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AdminPlaceholderPage } from '../pages/AdminPlaceholderPage';
import { HomePage } from '../pages/HomePage';
import { MenuPage } from '../pages/MenuPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route
          path="/admin/login"
          element={<AdminPlaceholderPage title="Owner Sign In" />}
        />
        <Route
          path="/admin"
          element={<AdminPlaceholderPage title="Owner Dashboard" />}
        />
        <Route
          path="/admin/menu/new"
          element={<AdminPlaceholderPage title="Create Menu Item" />}
        />
        <Route
          path="/admin/menu/:id/edit"
          element={<AdminPlaceholderPage title="Edit Menu Item" />}
        />
        <Route
          path="/admin/settings"
          element={<AdminPlaceholderPage title="Business Settings" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
