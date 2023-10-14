import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { RootProvider } from '$containers/root.provider';

const inter = Inter({ subsets: ['latin'] });

import './globals.css';

// eslint-disable-next-line import/no-named-export
export const metadata: Metadata = {
  title: 'Workout planner',
  manifest: '/manifest.json',
  themeColor: '#111111',
  icons: '/workout-planner.png',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" type="image/png" href="/workout-planner.png" /> */}
      </head>
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
