import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ScrollableDialogProps } from '@/shared/components';
import { returnUrlEgresoMaterialesPage } from '@/app/inventario/egreso-material/pages/tables/EgresoMaterialesPage';
import { useRecepcionEgresoStore } from '@/store/app';
import {
  CreateRecepcionMaterialParamsBase,
  useCreateEgresoMaterial,
  useUpdateRecepcionMaterial,
} from '@/actions/app';
import { returnUrlRecepcionMaterialPage } from '../tables/RecepcionMaterialMainPage';

export type RecepcionEgresoModalProps = {
  Arrays: any;
  openModal: boolean;
  onClose: () => void; // Nueva prop para manejar el cierre
};

const RecepcionEgresoModal: React.FC<RecepcionEgresoModalProps> = ({
  Arrays = [],
  openModal,
  onClose,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(openModal), [openModal]);

  ///* global state --------------------
  const addDataEgreso = useRecepcionEgresoStore(s => s.setRecepcionEgresos);

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* mutations
  const createEgresoMaterialMutation = useCreateEgresoMaterial({
    navigate,
    returnUrl: returnUrlEgresoMaterialesPage,
    enableErrorNavigate: false,
  });

  const updateRecepcionMaterialMutation =
    useUpdateRecepcionMaterial<CreateRecepcionMaterialParamsBase>({
      navigate,
      returnUrl: returnUrlRecepcionMaterialPage,
    });

  const onAceptar = () => {
    addDataEgreso(Arrays.productos);
    ///* upd
    const preparedData = {
      state: Arrays.state,
      observacion: Arrays.observacion,
      productos: Arrays.productos,
      bodega: Arrays.bodega,
      ubicacion: Arrays.ubicacion,
    };

    createEgresoMaterialMutation.mutate(preparedData);

    Arrays.estado_solicitud = 'APROBADO';
    updateRecepcionMaterialMutation.mutate({
      id: Arrays.id!,
      data: Arrays,
    });
  };

  const onRechazar = () => {
    setOpen(false);
    navigate(returnUrlRecepcionMaterialPage);
    onClose();
  };

  return (
    <>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => {
            onRechazar();
          }}
          confirmTextBtn="Aceptar"
          onConfirm={() => {
            onAceptar();
          }}
          title="¿DESEA GENERAR UN EGRESO?"
        />
      )}
    </>
  );
};

export default RecepcionEgresoModal;
