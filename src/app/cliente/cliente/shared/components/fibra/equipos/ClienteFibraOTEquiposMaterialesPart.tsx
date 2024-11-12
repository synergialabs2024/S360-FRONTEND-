import { LineaServicio } from '@/shared';

export type ClienteFibraOTEquiposMaterialesPartProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraOTEquiposMaterialesPart: React.FC<
  ClienteFibraOTEquiposMaterialesPartProps
> = ({ serviceLine }) => {
  const ordenTrabajo = serviceLine.orden_trabajo_data;
  console.log(ordenTrabajo);

  return <>ClienteFibraOTEquiposMaterialesPart</>;
};

export default ClienteFibraOTEquiposMaterialesPart;
