import { Promocion, useColumnsPromocion } from '@/shared';
import { CustomMinimalTable } from '@/shared/components';

export type PromocionPreventaComponentProps = { promocion: Promocion };

const PromocionPreventaComponent: React.FC<PromocionPreventaComponentProps> = ({
  promocion,
}) => {
  ///* columns ----------------
  const { promocionPreventaColumns } = useColumnsPromocion();

  return (
    <CustomMinimalTable<Promocion>
      columns={promocionPreventaColumns}
      data={[promocion]}
      enablePagination
      density="comfortable"
    />
  );
};

export default PromocionPreventaComponent;
