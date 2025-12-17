import './index.css';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Routes } from './routes';

export default function App() {
  return (
    <div className="flex bg-rotion-900 w-screen h-screen text-rotion-100">
      <Sidebar />
      <div className="flex flex-col flex-1 max-h-screen">
        <Header />
        <Routes />
      </div>
    </div>
  );
}
