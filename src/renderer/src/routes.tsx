import { Route } from 'react-router-dom';
import { Router } from '../../lib/electron-router-dom';
import { BlankPage } from './pages/blank-page';

export function Routes() {
  return <Router main={<Route element={<BlankPage />} path="/" />} />;
}
