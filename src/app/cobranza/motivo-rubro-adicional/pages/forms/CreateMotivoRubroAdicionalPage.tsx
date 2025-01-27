import { SaveMotivoRubroAdicional } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';

export type CreateMotivoRubroAdicionalPageProps = {};

const CreateMotivoRubroAdicionalPage: React.FC<
  CreateMotivoRubroAdicionalPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_motivo_rubro_adicional);

  return <SaveMotivoRubroAdicional title="Crear MotivoRubroAdicional" />;
};

export default CreateMotivoRubroAdicionalPage;
