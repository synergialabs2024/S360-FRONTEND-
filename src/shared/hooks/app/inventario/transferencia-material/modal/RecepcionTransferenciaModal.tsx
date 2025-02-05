import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ScrollableDialogProps } from '@/shared/components';
import { useRecepcionTransferenciaStore } from '@/store/app';
import {
  CreateSolicitudTransferenciaMaterialParamsBase,
  useCreateTransferenciaMaterial,
  useUpdateSolicitudTransferenciaMaterial,
} from '@/actions/app';
import { returnUrlRecepcionSolicitudTransferenciaMaterialesPage } from '@/app/inventario/recepcion-solicitud-transferencia/pages/tables/RecepcionSolicitudTransferenciaMaterialMainPages';
import { returnUrlTransferenciaMaterialesPage } from '@/app/inventario/transferencia-material/pages/tables/TransferenciaMaterialPage';

export type RecepcionTransferenciaModalProps = {
  Arrays: any;
  openModal: boolean;
  onClose: () => void; // Nueva prop para manejar el cierre
};

const RecepcionTransferenciaModal: React.FC<
  RecepcionTransferenciaModalProps
> = ({ Arrays = [], openModal, onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(openModal), [openModal]);

  ///* global state --------------------
  const addDataTransferencia = useRecepcionTransferenciaStore(
    s => s.setRecepcionTransferencias,
  );

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* mutations
  const createTransferenciaMaterialMutation = useCreateTransferenciaMaterial({
    navigate,
    returnUrl: returnUrlTransferenciaMaterialesPage,
    enableErrorNavigate: false,
  });

  const updateRecepcionMaterialMutation =
    useUpdateSolicitudTransferenciaMaterial<CreateSolicitudTransferenciaMaterialParamsBase>(
      {
        navigate,
        returnUrl: returnUrlRecepcionSolicitudTransferenciaMaterialesPage,
      },
    );

  const onAceptar = () => {
    addDataTransferencia(Arrays.productos);

    ///* upd
    const preparedData = {
      state: Arrays.state,
      observacion: Arrays.observacion,
      productos: Arrays.productos,
      bodega_origen: Arrays.bodega_origen,
      ubicacion_origen: Arrays.ubicacion_origen,
      bodega_destino: Arrays.bodega_destino,
      ubicacion_destino: Arrays.ubicacion_destino,
    };

    createTransferenciaMaterialMutation.mutate(preparedData);

    Arrays.estado_solicitud = 'APROBADO';
    updateRecepcionMaterialMutation.mutate({
      id: Arrays.id!,
      data: Arrays,
    });
  };

  const onRechazar = () => {
    setOpen(false);
    navigate(returnUrlRecepcionSolicitudTransferenciaMaterialesPage);
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
          title="¿DESEA GENERAR UNA TRANSFERENCIA?"
        />
      )}
    </>
  );
};

export default RecepcionTransferenciaModal;
