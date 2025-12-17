import type { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
}

export function SectionTitle(props: SectionTitleProps) {
  return <div className="mx-3 font-semibold text-rotion-300 text-xs uppercase" {...props} />;
}
