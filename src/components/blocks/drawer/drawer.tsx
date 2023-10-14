import clsx from 'clsx';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

import { DrawerHeader } from './drawer.header';

import { useOnClickOutside } from '$hooks/useOnClickOutside';
// import { useWindowDimensions } from '$hooks/useWindowDimensions';

interface DrawerProps {
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  testId?: string;
  id?: string;
  noBackdrop?: boolean;
  allowedRefs?: MutableRefObject<null>[] | MutableRefObject<null>;
  heading?: string;
  description?: string;
}

export const Drawer = ({
  className = '',
  isOpen = false,
  onClose,
  children,
  testId,
  id,
  noBackdrop,
  allowedRefs = [],
  heading,
  description,
}: DrawerProps) => {
  const [isOpenDelayed, setIsOpenDelayed] = useState(false);
  const [isClosedDelay, setIsClosedDelay] = useState(true);

  const drawerRef = useRef<HTMLElement>(null);
  const targetRefsArray = useMemo(() => {
    const allowedRefsArray = Array.isArray(allowedRefs)
      ? allowedRefs
      : [allowedRefs];

    return [drawerRef, ...allowedRefsArray];
  }, [allowedRefs]);

  useOnClickOutside(
    targetRefsArray,
    () => {
      onClose();
    },
    isOpen,
  );

  useEffect(() => {
    const timeout = setTimeout(() => setIsOpenDelayed(isOpen), 50);
    const closedTimeout = setTimeout(
      () => setIsClosedDelay(!isOpen),
      isOpen ? 0 : 200,
    );

    return () => {
      clearTimeout(timeout);
      clearTimeout(closedTimeout);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapePress = (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener('keydown', handleEscapePress as any);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener('keydown', handleEscapePress as any);
    };
  }, [isOpen, onClose]);

  const drawerClasses = {
    left: clsx('', {
      ['md:top-0 md:bottom-0 overflow-y-auto']: true,
      ['md:max-w-[600px] md:w-[75%]']: true,
      ['md:right-0']: true,
      ['md:aria-hidden:-right-[100vw]']: true,
    }),
    bottom: clsx('', {
      ['max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:px-8 max-md:pb-12 max-md:pt-8']:
        true,
      ['max-md:rounded-t-2xl']: true,
      ['max-md:aria-hidden:-bottom-[100vh]']: true,
      ['max-md:max-h-full']: true,
    }),
  };

  // const { width } = useWindowDimensions();

  // const defaultDrawerClasses =
  //   width >= 1024 ? drawerClasses.left : drawerClasses.bottom;

  const defaultDrawerClasses = clsx(drawerClasses.left, drawerClasses.bottom);

  const drawerBaseClasses = clsx('', {
    [className]: true,
    ['bg-white fixed transition-all z-[110] duration-200']: true,
    [defaultDrawerClasses]: true,
    ['hidden']: isClosedDelay,
  });

  if (!isOpen && !isOpenDelayed) return null;

  return (
    <>
      <section
        className={drawerBaseClasses}
        aria-hidden={!isOpen || !isOpenDelayed}
        ref={drawerRef}
        id={id}
        data-testid={testId ?? 'drawer'}
      >
        <DrawerHeader onClose={onClose} heading={heading} className="mb-8">
          {description}
        </DrawerHeader>
        {isClosedDelay ? null : children}
      </section>
      {!noBackdrop && (
        <div
          data-testid="drawer-backdrop"
          aria-hidden="true"
          className={clsx(
            'fixed inset-0 bg-black/[.50] transition-opacity duration-200',
            {
              ['z-[100] opacity-100']: isOpen,
              ['-z-10 opacity-0']: !isOpen || !isOpenDelayed,
            },
          )}
        />
      )}
    </>
  );
};
