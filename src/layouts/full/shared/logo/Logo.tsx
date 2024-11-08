import { FC } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { styled } from '@mui/material';
import { useUiStore } from '@/store/ui/ui.store';
import { useAuthStore } from '@/store/auth';

const Logo: FC = () => {
  const logo = useAuthStore(state => state.user?.company_data?.logo_1_url);
  const customizer = useUiStore(state => state.state);
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
        <img
          src={logo}
          alt=""
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
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
      <img
        src={logo}
        alt=""
        style={{ width: '00%', height: 'auto', objectFit: 'contain' }}
      />
    </LinkStyled>
  );
};

export default Logo;
