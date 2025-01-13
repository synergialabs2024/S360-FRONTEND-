import { useParams } from 'react-router-dom';

import { useGetOrdenTrabajo } from '@/actions/app';
import { CustomTitleRefNumber } from '@/shared/components';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveVisita from '../../shared/components/SaveVisita/SaveVisita';

export type VisitaTecnicoProps = {};

const VisitaTecnico: React.FC<VisitaTecnicoProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_ordentrabajo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetOrdenTrabajo(uuid!);
  useLoaders(isLoading || isRefetching);

  return (
    <SaveVisita
      titleNode={
        <CustomTitleRefNumber
          initialText="Visita Asignada"
          referenceNumber={data?.data?.numero_referencia!}
        />
      }
      ordentrabajo={data?.data}
    />
  );
};

export default VisitaTecnico;
