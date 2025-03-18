import { SaveAsunto } from '../../shared/components/SaveAsunto';

export type CreateAsuntoPageProps = {};

const CreateAsuntoPage: React.FC<CreateAsuntoPageProps> = () => {
  return <SaveAsunto title="Crear Asunto" />;
};

export default CreateAsuntoPage;
