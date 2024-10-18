import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';

export type LogoSectionProps = {};

const LogoSection: React.FC<LogoSectionProps> = () => {
  return (
    <ButtonBase disableRipple onClick={() => {}} component={Link} to={'/'}>
      LOGO
    </ButtonBase>
  );
};

export default LogoSection;
