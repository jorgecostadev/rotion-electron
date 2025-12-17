import clsx from 'clsx';
import { CaretDoubleRight, Code, TrashSimple } from 'phosphor-react';
import * as Breadcrumbs from './Breadcrumbs';

export function Header() {
  const isMacOS = process.platform === 'darwin';
  const isSidebarOpen = true;

  return (
    <div
      id="header"
      className={clsx(
        'flex items-center gap-4 px-6 py-[1.125rem] border-rotion-600 border-b leading-tight transition-all duration-250 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
        },
      )}
    >
      <button
        className={clsx('w-5 h-5 text-rotion-200 hover:text-rotion-50', {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className="w-4 h-4" />
      </button>

      <>
        <Breadcrumbs.Root>
          <Breadcrumbs.Item>
            <Code weight="bold" className="w-4 h-4 text-pink-500" />
            Estrutura técnica
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.HiddenItems />
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
        </Breadcrumbs.Root>

        <div className="inline-flex region-no-drag">
          <button className="inline-flex items-center gap-1 text-rotion-100 hover:text-rotion-50 text-sm">
            <TrashSimple className="w-4 h-4" />
            Apagar
          </button>
        </div>
      </>
    </div>
  );
}
