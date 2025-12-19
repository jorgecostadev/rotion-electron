import { Header } from '@renderer/components/Header';
import { Sidebar } from '@renderer/components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Default() {
  return (
    <div className="flex bg-rotion-900 w-screen h-screen text-rotion-100">
      <Sidebar />
      <div className="flex flex-col flex-1 max-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
