import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { createRubroClienteFormSchema } from '@/shared';

export type ClienteFibraRubroLibreModalProps = {};

type RubrosClienteFormData = {};

const ClienteFibraRubroLibreModal: React.FC<
  ClienteFibraRubroLibreModalProps
> = () => {
  ///* form --------------------------
  const form = useForm<RubrosClienteFormData>({
    resolver: yupResolver(createRubroClienteFormSchema) as any,
    defaultValues: {},
  });
  console.log(form);

  return <>ClienteFibraRubroLibreModal</>;
};

export default ClienteFibraRubroLibreModal;
