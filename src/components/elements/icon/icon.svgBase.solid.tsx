interface IconSvgBaseProps {
  children: React.ReactNode;
  className: string;
  viewBox?: `${number} ${number} ${number} ${number}`;
}

export const IconSvgBaseSolid = ({
  children,
  className,
  viewBox = '0 0 20 20',
}: IconSvgBaseProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox={viewBox}
      fill="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
};
