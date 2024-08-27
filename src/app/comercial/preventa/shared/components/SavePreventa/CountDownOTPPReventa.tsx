import { useGenericCountdownStore } from '@/store/ui';

export type CountDownOTPPReventaProps = {
  celular: string;
};

const CountDownOTPPReventa: React.FC<CountDownOTPPReventaProps> = () => {
  const count = useGenericCountdownStore(s => s.count);

  const minutes = Math.floor((count ?? 0) / 60);
  const seconds = (count ?? 0) % 60;

  console.log('count', count, 'minutes', minutes, 'seconds', seconds);

  return <>CountDownOTPPReventa</>;
};

export default CountDownOTPPReventa;
