import { Command } from 'cmdk';
import { File, MagnifyingGlass } from 'phosphor-react';
import { useEffect, useState } from 'react';

export function SearchBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen((state) => !state);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  return (
    <Command.Dialog
      className="top-24 left-1/2 fixed bg-rotion-800 shadow-2xl border border-rotion-600 rounded-md w-[480px] max-w-full text-rotion-100 -translate-x-1/2"
      open={open}
      onOpenChange={setOpen}
      label="Search"
    >
      <div className="flex items-center gap-2 p-4 border-rotion-700 border-b">
        <MagnifyingGlass className="w-5 h-5" />
        <Command.Input
          autoFocus
          placeholder="Buscar documentos..."
          className="bg-transparent focus:outline-none w-full text-rotion-50 placeholder:text-rotion-200 text-sm"
        />
      </div>
      <Command.List className="py-2 max-h-48 scrollbar-thin scrollbar-thumb-rotion-600 scrollbar-track-rotion-800">
        <Command.Empty className="px-4 py-3 text-rotion-200 text-sm">Nenhum documento encontrado.</Command.Empty>

        <Command.Item className="flex items-center gap-2 aria-selected:!bg-rotion-600 hover:bg-rotion-700 px-4 py-3 text-rotion-50 text-sm">
          <File className="w-4 h-4" />
          Untitled
        </Command.Item>

        <Command.Item className="flex items-center gap-2 aria-selected:!bg-rotion-600 hover:bg-rotion-700 px-4 py-3 text-rotion-50 text-sm">
          <File className="w-4 h-4" />
          Ignite
        </Command.Item>

        <Command.Item className="flex items-center gap-2 aria-selected:!bg-rotion-600 hover:bg-rotion-700 px-4 py-3 text-rotion-50 text-sm">
          <File className="w-4 h-4" />
          Discover
        </Command.Item>

        <Command.Item className="flex items-center gap-2 aria-selected:!bg-rotion-600 hover:bg-rotion-700 px-4 py-3 text-rotion-50 text-sm">
          <File className="w-4 h-4" />
          Rocketseat
        </Command.Item>
      </Command.List>
    </Command.Dialog>
  );
}
