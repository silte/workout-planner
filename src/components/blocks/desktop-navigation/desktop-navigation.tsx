import { DesktopNavigationItem } from './desktop-navigation.item';

import { IconName } from '$elements/icon/icon';

export const DesktopNavigation = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1">
      <nav aria-label="Main navigation in desktop viewmode.">
        <ul className="-ml-4 space-y-2">
          <DesktopNavigationItem
            label="Etusivu"
            iconName={IconName.home}
            link="/"
            isExact
          />
          <DesktopNavigationItem
            label="Harjoitukset"
            iconName={IconName.chartBar}
            link="/harjoitukset"
          />
          <DesktopNavigationItem
            label="Suunnitellut harjoitukset"
            iconName={IconName.viewGrid}
            link="/suunnitelmat"
          />
          <DesktopNavigationItem
            label="Urheilijat"
            iconName={IconName.userCircle}
            link="/urheilijat"
          />
          <DesktopNavigationItem
            label="Muuntimet"
            iconName={IconName.cog}
            link="/muuntimet"
          />
        </ul>
      </nav>
    </div>
  );
};
