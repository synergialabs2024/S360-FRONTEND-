import copy from 'copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';

import SingleIconButton from './SingleIconButton';

export type CopyTextOnClickBtnProps = {
  text: string;
  label?: string;
  onClick?: () => void;
  customIcon?: React.ReactNode;
};

const CopyTextOnClickBtn: React.FC<CopyTextOnClickBtnProps> = ({
  text,
  label,
  onClick,
}) => {
  ///* handlers ----------------
  const handleCopy = () => {
    copy(text);
    onClick && onClick();
  };

  return (
    <>
      <SingleIconButton
        onClick={handleCopy}
        startIcon={<MdContentCopy />}
        label={label}
      />
    </>
  );
};

export default CopyTextOnClickBtn;
