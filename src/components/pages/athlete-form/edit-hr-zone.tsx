import { Drawer } from '$blocks/drawer/drawer';
import { Heading } from '$elements/heading/heading';
import { Input } from '$elements/input/input';

type EditHrZoneProps = {
  onClose: () => void;
  index: number;
};

export const EditHrZone = ({ onClose, index }: EditHrZoneProps) => {
  const isOpen = !isNaN(index);

  return (
    <Drawer onClose={onClose} isOpen={isOpen}>
      <div className="m-4">
        <Heading variant="h2">Muokkaa sykealuetta</Heading>
        <Input id={`hrZones.${index}.name`}>Nimi</Input>
        <Input id={`hrZones.${index}.bpm`} type="number">
          Syke
        </Input>
      </div>
    </Drawer>
  );
};
