import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router as ElectronRouter } from '../../lib/electron-router-dom';
import Default from './layout/default';
import { BlankPage } from './pages/blank-page';

export function AppRoutes() {
  if (import.meta.env.DEV) {
    return (
      <BrowserRouter basename="/main">
        <Routes>
          <Route element={<Default />} path="/">
            <Route element={<BlankPage />} path="/" />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

  return <ElectronRouter main={<Route element={<BlankPage />} path="/" />} />;
}
