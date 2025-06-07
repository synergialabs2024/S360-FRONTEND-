import { FaFilePdf } from 'react-icons/fa';
import { TbFileTypeXml } from 'react-icons/tb';

import { SingleIconButton } from '../../CustomButtons';

export type PDFIconButtonProps = {
  url: string;
  onClick?: () => void;
  isXml?: boolean;
  disabled?: boolean;
};

const PDFIconButton: React.FC<PDFIconButtonProps> = ({
  onClick,
  url,
  isXml = false,
  disabled = false,
}) => {
  return (
    <>
      <SingleIconButton
        label={`Ver ${isXml ? 'XML' : 'PDF'}`}
        startIcon={isXml ? <TbFileTypeXml /> : <FaFilePdf />}
        color={isXml ? 'inherit' : 'error'}
        disabled={disabled}
        onClick={() => {
          if (onClick) {
            onClick();
            return;
          }

          if (isXml) {
            const blob = new Blob([url], { type: 'text/xml' });
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');
          } else {
            window.open(url, '_blank');
          }
        }}
      />
    </>
  );
};

export default PDFIconButton;
