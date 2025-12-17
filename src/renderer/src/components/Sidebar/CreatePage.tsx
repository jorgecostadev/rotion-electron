import { Plus } from 'phosphor-react';

export function CreatePage() {
  return (
    <button className="right-0 bottom-0 left-0 absolute flex items-center gap-2 hover:bg-rotion-700 disabled:opacity-60 px-5 py-4 border-rotion-600 border-t w-[240px] text-sm">
      <Plus className="w-4 h-4" />
      Create new page
    </button>
  );
}
