import { PermissionsEnum } from '@/shared';
import { SaveMotivoRubroAdicional } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';

export type CreateMotivoRubroAdicionalPageProps = {};

const CreateMotivoRubroAdicionalPage: React.FC<
  CreateMotivoRubroAdicionalPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_motivorubroadicional);

  return <SaveMotivoRubroAdicional title="Crear Motivo Rubro Adicional" />;
};

export default CreateMotivoRubroAdicionalPage;
