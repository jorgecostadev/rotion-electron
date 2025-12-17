import { CaretDown, User } from 'phosphor-react';

export function Profile() {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return (
      <button className="group flex items-center gap-2 mx-5 font-medium text-rotion-100 text-sm">
        <div className="bg-rotion-500 p-1 rounded-sm w-5 h-5">
          <User className="w-3 h-3 text-rotion-300" />
        </div>
        Fazer login
      </button>
    );
  }

  return (
    <button className="group flex items-center gap-2 mx-5 font-medium text-rotion-50 text-sm">
      <img className="rounded-sm w-5 h-5" src="https://avatars.githubusercontent.com/u/2254731?v=4" alt="" />
      Diego Fernandes
      <CaretDown className="w-4 h-4 text-rotion-100 group-hover:text-rotion-50" />
    </button>
  );
}
