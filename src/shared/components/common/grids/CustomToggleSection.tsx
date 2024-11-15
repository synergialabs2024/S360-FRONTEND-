import { useState } from 'react';

import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';
import { SingleIconButton } from '../../CustomButtons';
import { TabTexLabelCustomSpace } from '../../Labels';

export type CustomToggleSectionProps = {
  sectionTitle: string;
  children: React.ReactNode;

  iconLess?: React.ReactNode;
  iconMore?: React.ReactNode;

  customShowInitState?: boolean;
};

const CustomToggleSection: React.FC<CustomToggleSectionProps> = ({
  customShowInitState = true,
  children,
  sectionTitle,
  iconLess = <MdOutlineExpandLess />,
  iconMore = <MdOutlineExpandMore />,
}) => {
  const [show, setShow] = useState<boolean>(!!customShowInitState);

  return (
    <>
      <TabTexLabelCustomSpace
        textContent={sectionTitle}
        showCustomRightSpace={true}
        customRightSpace={
          <SingleIconButton
            newCustomButton
            startIcon={show ? iconLess : iconMore}
            label={show ? 'OCULTAR' : 'VER MÁS'}
            onClick={() => {
              setShow(prev => !prev);
            }}
          />
        }
      />

      <>{show && children}</>
    </>
  );
};

export default CustomToggleSection;
