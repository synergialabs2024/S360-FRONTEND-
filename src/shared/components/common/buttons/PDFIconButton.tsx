import { FaFilePdf } from 'react-icons/fa';

import { SingleIconButton } from '../../CustomButtons';

export type PDFIconButtonProps = {
  url: string;
  onClick?: () => void;
};

const PDFIconButton: React.FC<PDFIconButtonProps> = ({ onClick, url }) => {
  return (
    <>
      <SingleIconButton
        label="Ver PDF"
        startIcon={<FaFilePdf />}
        color="error"
        onClick={() => {
          if (onClick) {
            onClick();
            return;
          }

          window.open(url, '_blank');
        }}
      />
    </>
  );
};

export default PDFIconButton;
