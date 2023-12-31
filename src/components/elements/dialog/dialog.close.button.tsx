import { Icon, IconName } from '../icon/icon';

interface DialogCloseButtonProps {
  isDialogOpen?: boolean;
  setIsDialogOpen: (state: boolean) => void;
}

export const DialogCloseButton = ({
  setIsDialogOpen,
  isDialogOpen,
}: DialogCloseButtonProps) => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-full h-11 w-11 bg-gray-100 hover:bg-gray-200"
      onClick={() => setIsDialogOpen(!isDialogOpen)}
    >
      <span className="sr-only">Close dialog</span>
      <Icon type={IconName.plus} className="rotate-45 stroke-gray-600" />
    </button>
  );
};
