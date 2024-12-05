import { UseFormReturn } from 'react-hook-form';

import { SaveFormDataConfigPlantilla } from '@/app/administration/config-plantilla/shared/components/form/SaveConfiguracionPlantilla';

export type ConfigPlantillaClienteFibraFacturacionCardsProps = {
  form: UseFormReturn<SaveFormDataConfigPlantilla>;
};

const ConfigPlantillaClienteFibraFacturacionCards: React.FC<
  ConfigPlantillaClienteFibraFacturacionCardsProps
> = ({ form }) => {
  ///* form ---------------------
  const watchedPaymentDay = form.watch('dia_pago');

  return <>CARDS: Dia de pago{watchedPaymentDay}</>;
};

export default ConfigPlantillaClienteFibraFacturacionCards;
