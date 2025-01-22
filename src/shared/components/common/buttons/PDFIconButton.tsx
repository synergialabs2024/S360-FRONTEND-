import { FaFilePdf } from 'react-icons/fa';
import { TbFileTypeXml } from 'react-icons/tb';

import { SingleIconButton } from '../../CustomButtons';

export type PDFIconButtonProps = {
  url: string;
  onClick?: () => void;
  isXml?: boolean;
};

const PDFIconButton: React.FC<PDFIconButtonProps> = ({
  onClick,
  url,
  isXml = false,
}) => {
  return (
    <>
      <SingleIconButton
        label={`Ver ${isXml ? 'XML' : 'PDF'}`}
        startIcon={isXml ? <TbFileTypeXml /> : <FaFilePdf />}
        color={isXml ? 'inherit' : 'error'}
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
