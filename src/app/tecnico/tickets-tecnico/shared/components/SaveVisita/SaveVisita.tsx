import { Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { CreateOrdenTrabajoParamsBase } from '@/actions/app';
import {
  getKeysFormErrorsMessage,
  gridSize,
  ToastWrapper,
  useTabsOnly,
  useUploadImageGeneric,
} from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import { OrdenTrabajo } from '@/shared/interfaces';
import { ROUTER_PATHS } from '@/router/constants';
import { PrerejectInstalacionAsignadaOTModal } from '@/app/tecnico/install-asignada/shared/components/form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ticketTecnicoFormSchema } from '@/shared/utils/validation-schemas/app/tickets/ticket-tecnico.schema';

export const returnUrlTicketTecnico = ROUTER_PATHS.tecnico.ticketsAsignados;

export interface SaveVisitaProps {
  titleNode: React.ReactNode;
  ordentrabajo?: OrdenTrabajo;
}

export type InstallAsignOTSaveFormData = CreateOrdenTrabajoParamsBase & {};

const SaveVisita: React.FC<SaveVisitaProps> = ({ titleNode, ordentrabajo }) => {
  ///* form ---------------------
  const form = useForm<InstallAsignOTSaveFormData>({
    resolver: yupResolver(ticketTecnicoFormSchema) as any,
  });

  const { handleSubmit } = form;
  ///* states ---------------------
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  const {
    UploadImageDropZoneComponent,
    image1: fotoAntesSolucion,
    setImage1: setFotoAntesSolucion,
    image2: fotoDespuesSolucion,
    setImage2: setFotoDespuesSolucion,
    image3: fotoTestVelocidad,
    setImage3: setFotoTestVelocidad,
    image4: fotoPotenciaAntesSolucion,
    setImage4: setFotoPotenciaAntesSolucion,
    image5: fotoPotenciaDespuesSolucion,
    setImage5: setFotoPotenciaDespuesSolucion,
    image6: fotoProblemaEncontrado,
    setImage6: setFotoProblemaEncontrado,
    image7: fotoSolucion,
    setImage7: setFotoSolucion,
    image8: fotoEntregaMesh,
    setImage8: setFotoEntregaMesh,
    image9: fotoEntregaUps,
    setImage9: setFotoEntregaUps,
  } = useUploadImageGeneric();

  const requiredImages = [
    {
      label: 'Foto Antes Solucion',
      image: fotoAntesSolucion,
      setImage: setFotoAntesSolucion,
      isRequired: true,
    },
    {
      label: 'Foto Despues Solucion',
      image: fotoDespuesSolucion,
      setImage: setFotoDespuesSolucion,
      isRequired: true,
    },

    {
      label: 'Foto Test Velocidad',
      image: fotoTestVelocidad,
      setImage: setFotoTestVelocidad,
      isRequired: true,
    },
    {
      label: 'Foto Potencia Antes Solucion',
      image: fotoPotenciaAntesSolucion,
      setImage: setFotoPotenciaAntesSolucion,
      isRequired: true,
    },
    {
      label: 'Foto Potencia Despues Solucion',
      image: fotoPotenciaDespuesSolucion,
      setImage: setFotoPotenciaDespuesSolucion,
      isRequired: true,
    },
    {
      label: 'Foto Problema Encontrado',
      image: fotoProblemaEncontrado,
      setImage: setFotoProblemaEncontrado,
      isRequired: true,
    },

    {
      label: 'Foto Solucion',
      image: fotoSolucion,
      setImage: setFotoSolucion,
      isRequired: true,
    },
    {
      label: 'Foto Entrega Mesh',
      image: fotoEntregaMesh,
      setImage: setFotoEntregaMesh,
      isRequired: false,
    },
    {
      label: 'Foto Entrega Ups',
      image: fotoEntregaUps,
      setImage: setFotoEntregaUps,
      isRequired: false,
    },
  ];

  ///* handlers ---------------------
  const onSave = async (data: InstallAsignOTSaveFormData) => {
    console.log('data', data);
  };

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      // action btns
      onCancel={() => navigate(returnUrlTicketTecnico)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(`Error en: ${getKeysFormErrorsMessage(errors)}`);
      })}
      onReject={() => {
        // setIsOpenRejectModal(true);
      }}
      // tabs
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Fotos" value={1} {...a11yProps(1)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Fotos ========================= */}
      <CustomTabPanel index={4} value={tabValue}>
        {requiredImages.map(({ label, image, setImage }) => (
          <UploadImageDropZoneComponent
            key={label}
            buttonLabel={label}
            selectedImage={image}
            setSelectedImage={setImage as any}
          />
        ))}
      </CustomTabPanel>

      {/* ========================= modals ========================= */}
      <PrerejectInstalacionAsignadaOTModal
        open={isOpenRejectModal}
        onClose={() => setIsOpenRejectModal(false)}
        ordenTrabajo={ordentrabajo!}
      />
    </TabsFormBoxScene>
  );
};

export default SaveVisita;
