'use client';

import { ReactNode } from 'react';

import { PageInfoProvider } from './page-info.context';
import { TransitionProvider } from './transition.provider';

import { Layout } from '$layouts/layout/layout';

type RootProviderProps = {
  children: ReactNode;
};

export const RootProvider = ({ children }: RootProviderProps) => (
  <PageInfoProvider>
    <TransitionProvider>
      <Layout>{children}</Layout>
    </TransitionProvider>
  </PageInfoProvider>
);
