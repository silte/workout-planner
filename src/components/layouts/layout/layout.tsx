import Link from 'next/link';
import { useState, useEffect } from 'react';

import { DesktopNavigation } from '$blocks/desktop-navigation/desktop-navigation';
import { MobileNavigation } from '$blocks/mobile-navigation/mobile-navigation';
import { Container } from '$layouts/container/container';
import { DesktopHeader } from '$layouts/desktop-header/desktop-header';
import { MobileHeader } from '$layouts/mobile-header/mobile-header';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [currentWindowWidth, setCurrentWindowWidth] = useState(
    typeof window !== 'undefined' ? window.outerWidth : 0,
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const loadInitialWidth = (times = 0) => {
      if (window?.outerWidth) {
        setCurrentWindowWidth(window.outerWidth);
        return;
      } else if (times < 10) {
        timeout = setTimeout(loadInitialWidth, 50, times + 1);
      }
    };

    loadInitialWidth();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const action = () => setCurrentWindowWidth(window.outerWidth);
    let timeout: NodeJS.Timeout;

    window.addEventListener('resize', () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(action, 50);
    });

    return () => window.removeEventListener('resize', () => action);
  }, []);

  if (currentWindowWidth >= 1024) {
    return (
      <div className="bg-white">
        <Container className="grid grid-cols-[300px,1fr] min-h-screen px-0">
          <aside className="after:bg-gray after:ml-[-100vw] after:pr-[100vw] after:absolute after:top-0 after:bottom-0 after:right-0 relative border-r border-gray-200 vt-name-[desktop-navigation]">
            <div className="sticky top-0 z-10 min-h-screen pt-12 pb-12 pl-8 pr-4 bottom-12">
              <header>
                <Link href="/" className="inline-flex items-center gap-3 mb-8">
                  {/* <Image
                    src="/logo.svg"
                    alt="Workout planner logo"
                    className="w-12 h-12"
                    width={48}
                    height={48}
                  /> */}

                  <h2 className="text-xl font-extrabold tracking-tighter text-black uppercase">
                    Workout planner
                  </h2>
                </Link>
                <DesktopNavigation />
              </header>
            </div>
          </aside>
          <main>
            <div className="px-8 py-12" data-testid="layout-root">
              <DesktopHeader />
              {children}
            </div>
          </main>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-screen overflow-y-scroll lg:hidden">
      <main className="flex-grow bg-white lg:pb-24 min-h-screen-safe pb-safe">
        <div className={`px-4 mt-[64px] pt-4 pb-24`} data-testid="layout-root">
          {children}
        </div>
      </main>
      <header>
        <MobileHeader />
        <MobileNavigation />
      </header>
    </div>
  );
};
