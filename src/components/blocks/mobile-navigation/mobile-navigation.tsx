import { MobileNavigationItem } from './mobile-navigation.item';

import { IconName } from '$elements/icon/icon';

export const MobileNavigation = (): JSX.Element => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 w-full bg-white border-t border-gray-200 pb-safe vt-name-[mobile-navigation]">
      <nav aria-label="Main navigation in mobile viewmode">
        <ul className={`grid grid-cols-5 relative`}>
          <MobileNavigationItem
            label="Etusivu"
            iconName={IconName.home}
            link="/"
            isExact
          />
          <MobileNavigationItem
            label="Harjoitukset"
            iconName={IconName.chartBar}
            link="/harjoitukset"
          />
          <MobileNavigationItem
            label="Suunnitellut harjoitukset"
            iconName={IconName.viewGrid}
            link="/suunnitelmat"
          />
          <MobileNavigationItem
            label="Urheilijat"
            iconName={IconName.userCircle}
            link="/urheilijat"
          />
          <MobileNavigationItem
            label="Muuntimet"
            iconName={IconName.cog}
            link="/muuntimet"
          />
        </ul>
      </nav>
    </div>
  );
};
