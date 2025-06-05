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
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'archivo.xml'); // Puedes cambiar el nombre si quieres
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            window.open(url, '_blank');
          }
        }}
      />
    </>
  );
};

export default PDFIconButton;
