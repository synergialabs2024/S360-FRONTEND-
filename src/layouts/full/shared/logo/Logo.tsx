import { FC } from 'react';
import { useSelector } from '@/store/Store';
import { Link } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoDark } from '@/assets/images/logos/dark-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoDarkRTL } from '@/assets/images/logos/dark-rtl-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoLight } from '@/assets/images/logos/light-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoLightRTL } from '@/assets/images/logos/light-logo-rtl.svg';
import { styled } from '@mui/material';
import { AppState } from '@/store/Store';

const Logo: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {customizer.activeMode === 'dark' ? <LogoLight /> : <LogoDark />}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {customizer.activeMode === 'dark' ? <LogoDarkRTL /> : <LogoLightRTL />}
    </LinkStyled>
  );
};

export default Logo;
