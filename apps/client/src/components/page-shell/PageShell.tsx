import UIWrapper from '@/components/ui-wrapper';
import Footer from '@/features/footer';
import Header from '@/features/header';
import type { ReactNode } from 'react';

export const PageShell = ({ children }: { children: ReactNode }) => (
  <UIWrapper>
    <Header />
    {children}
    <Footer />
  </UIWrapper>
);
