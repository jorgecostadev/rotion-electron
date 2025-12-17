import type { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export function Root(props: RootProps) {
  return <nav className="flex flex-col gap-8 mx-2 text-rotion-100" {...props} />;
}
