import type { ReactNode } from 'react';

interface ToCRootProps {
  children: ReactNode;
}

export function ToCRoot(props: ToCRootProps) {
  return <div className="flex flex-col gap-2 mt-2 text-rotion-100 text-sm" {...props} />;
}
