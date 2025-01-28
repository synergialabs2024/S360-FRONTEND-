import { SaveMotivoRubroAdicional } from '../../shared/components';

export type CreateMotivoRubroAdicionalPageProps = {};

const CreateMotivoRubroAdicionalPage: React.FC<
  CreateMotivoRubroAdicionalPageProps
> = () => {
  // useCheckPermission(PermissionsEnum.cobranza_add_motivo_rubro_adicional);

  return <SaveMotivoRubroAdicional title="Crear MotivoRubroAdicional" />;
};

export default CreateMotivoRubroAdicionalPage;
