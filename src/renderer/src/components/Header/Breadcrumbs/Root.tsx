import type { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export function Root(props: RootProps) {
  return (
    <div className="flex flex-1 items-center overflow-hidden">
      <div className="inline-flex items-center gap-2 text-rotion-100 text-sm whitespace-nowrap region-no-drag">
        {props.children}
      </div>
    </div>
  );
}
