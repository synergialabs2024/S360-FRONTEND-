import { calcImageListOrdenTrabajoFromUrls, LineaServicio } from '@/shared';
import { ImageListTitleBars } from '@/shared/components/ui';

export type ClienteFibraOTFotosPartProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraOTFotosPart: React.FC<ClienteFibraOTFotosPartProps> = ({
  serviceLine,
}) => {
  return (
    <ImageListTitleBars
      images={
        calcImageListOrdenTrabajoFromUrls(serviceLine?.orden_trabajo_data) || []
      }
    />
  );
};

export default ClienteFibraOTFotosPart;
