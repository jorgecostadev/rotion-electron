import clsx from 'clsx';
import { DotsThree } from 'phosphor-react';
import type { ReactNode } from 'react';

interface LinkProps {
  children: ReactNode;
}

export function Link({ children }: LinkProps) {
  return (
    <a
      href="#"
      className={clsx(
        'group flex items-center gap-2 hover:bg-rotion-700 px-3 py-1 rounded text-rotion-100 hover:text-rotion-50 text-sm',
      )}
    >
      <span className="flex-1 truncate">{children}</span>

      <div className="group-hover:visible flex items-center ml-auto h-full text-rotion-100">
        <button className="hover:bg-rotion-500 px-px rounded-sm">
          <DotsThree weight="bold" className="w-4 h-4" />
        </button>
      </div>
    </a>
  );
}
