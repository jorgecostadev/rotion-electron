import clsx from 'clsx';
import { CaretDoubleLeft } from 'phosphor-react';
import { CreatePage } from './CreatePage';
import * as Navigation from './Navigation';
import { Profile } from './Profile';
import { Search } from './Search';

export function Sidebar() {
  const isMacOS = process.platform === 'darwin';

  return (
    <aside className="group relative flex-shrink-0 bg-rotion-800 border-rotion-600 border-r h-screen overflow-hidden data-[state=closed]:animate-slideOut data-[state=open]:animate-slideIn">
      <button
        className={clsx(
          'inline-flex right-4 absolute justify-center items-center w-5 h-5 text-rotion-200 hover:text-rotion-50',
          {
            'top-[1.125rem]': isMacOS,
            'top-6': !isMacOS,
          },
        )}
      >
        <CaretDoubleLeft className="w-4 h-4" />
      </button>

      <div
        className={clsx('h-14 region-drag', {
          block: isMacOS,
          hidden: !isMacOS,
        })}
      ></div>

      <div
        className={clsx(
          'flex flex-col flex-1 gap-8 group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100 w-[240px] h-full transition-opacity duration-200',
          {
            'pt-6': !isMacOS,
          },
        )}
      >
        <Profile />
        <Search />

        <Navigation.Root>
          <Navigation.Section>
            <Navigation.SectionTitle>Workspace</Navigation.SectionTitle>
            <Navigation.SectionContent>
              <Navigation.Link>Untitled</Navigation.Link>
              <Navigation.Link>Discover</Navigation.Link>
              <Navigation.Link>Ignite</Navigation.Link>
              <Navigation.Link>Rocketseat</Navigation.Link>
            </Navigation.SectionContent>
          </Navigation.Section>
        </Navigation.Root>

        <CreatePage />
      </div>
    </aside>
  );
}
