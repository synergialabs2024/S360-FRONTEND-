import { useAuthStore } from '@/store/auth';

export type CompanyLogoProps = {
  logoHeight?: string;
};

const CompanyLogo: React.FC<CompanyLogoProps> = ({ logoHeight = '4.2rem' }) => {
  const user = useAuthStore(s => s.user);

  return (
    <>
      <img
        src={user?.company_data?.logo_1_url || ''}
        alt="logo"
        style={{ width: 'auto', height: logoHeight, objectFit: 'contain' }}
        draggable={false}
      />
    </>
  );
};

export default CompanyLogo;
