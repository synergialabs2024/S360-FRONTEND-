import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateOrdenTrabajoParamsBase,
  useUpdateOrdenTrabajo,
} from '@/actions/app';
import {
  gridSize,
  gridSizeMdLg9,
  Preventa,
  SolicitudServicio,
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
import {
  getKeysFormErrorsMessage,
  ordenTrabajoFormSchema,
  sanitizeDataResetForm,
} from '@/shared/utils';
import { returnUrlInstallAsignadasOT } from '../../../pages/tables/InstalacionesAsignadasOTMainPage';
import {
  InstallAsigOrdenTrabajoFormTab,
  InstallAsigOTMaterialesFormTab,
  InstallAsigTecnicoOTFormTab,
} from '../form';

export interface SaveOrdenTrabajoProps {
  titleNode: React.ReactNode;
  ordentrabajo?: OrdenTrabajo;
}

export type InstallAsignOTSaveFormData = CreateOrdenTrabajoParamsBase &
  Partial<SolicitudServicio> &
  Partial<Preventa> & {
    metraje_autorizado_fibra: string;
  };

const SaveOrdenTrabajo: React.FC<SaveOrdenTrabajoProps> = ({
  titleNode,
  ordentrabajo,
}) => {
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  const {
    UploadImageDropZoneComponent,
    image1: fotoONT,
    setImage1: setFotoONT,
    image2: fotoPotenciaONT,
    setImage2: setFotoPotenciaONT,
    image3: fotoONTEncontradoCasa,
    setImage3: setFotoONTEncontradoCasa,
    image4: fotoEtiqueta,
    setImage4: setFotoEtiqueta,
    image5: fotoNAP,
    setImage5: setFotoNAP,
    image6: fotoPotenciaNAP,
    setImage6: setFotoPotenciaNAP,
    image7: fotoPremio,
    setImage7: setFotoPremio,
    image8: fotoTestSpeed,
    setImage8: setFotoTestSpeed,
    image9: fotoActaEntregaUPS,
    setImage9: setFotoActaEntregaUPS,
  } = useUploadImageGeneric();
  const requiredImages = [
    {
      label: 'Foto ONT',
      image: fotoONT,
      setImage: setFotoONT,
      isRequired: true,
    },
    {
      label: 'Foto Potencia ONT',
      image: fotoPotenciaONT,
      setImage: setFotoPotenciaONT,
      isRequired: true,
    },

    {
      label: 'Foto Etiqueta',
      image: fotoEtiqueta,
      setImage: setFotoEtiqueta,
      isRequired: true,
    },
    {
      label: 'Foto NAP',
      image: fotoNAP,
      setImage: setFotoNAP,
      isRequired: true,
    },
    {
      label: 'Foto Potencia NAP',
      image: fotoPotenciaNAP,
      setImage: setFotoPotenciaNAP,
      isRequired: true,
    },
    {
      label: 'Foto Test Speed',
      image: fotoTestSpeed,
      setImage: setFotoTestSpeed,
      isRequired: true,
    },

    {
      label: 'Foto ONT encontrado en casa',
      image: fotoONTEncontradoCasa,
      setImage: setFotoONTEncontradoCasa,
      isRequired: false,
    },
    {
      label: 'Foto Acta Entrega UPS',
      image: fotoActaEntregaUPS,
      setImage: setFotoActaEntregaUPS,
      isRequired: false,
    },
    {
      label: 'Foto Premio',
      image: fotoPremio,
      setImage: setFotoPremio,
      isRequired: false,
    },
  ];

  ///* form ---------------------
  const form = useForm<InstallAsignOTSaveFormData>({
    resolver: yupResolver(ordenTrabajoFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;

  ///* mutations ---------------------
  const updateOrdenTrabajoMutation =
    useUpdateOrdenTrabajo<CreateOrdenTrabajoParamsBase>({
      navigate,
      returnUrl: returnUrlInstallAsignadasOT,
    });

  ///* handlers ---------------------
  const onSave = async (data: InstallAsignOTSaveFormData) => {
    if (!isValid) return;

    ///* validate images -------
    let thereAreEmptyRequiredImages = false;
    let emptyImageName: any = {};
    requiredImages.forEach(({ isRequired, image, label }) => {
      if (isRequired && !image) {
        thereAreEmptyRequiredImages = true;
        emptyImageName = label;
      }
    });
    if (thereAreEmptyRequiredImages) {
      ToastWrapper.error(`La imagen ${emptyImageName?.label} es requerida`);
      return;
    }

    ///* upd
    if (ordentrabajo?.id) {
      updateOrdenTrabajoMutation.mutate({ id: ordentrabajo.id!, data });
      return;
    }
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!ordentrabajo?.id) return;

    const { solicitud_servicio_data, preventa_data, agendamiento_data } =
      ordentrabajo;

    const dataToReset = {
      ...ordentrabajo,
      ...solicitud_servicio_data,
      ...preventa_data,
      ...agendamiento_data,

      serie_ont: ordentrabajo?.serie_ont || undefined,
      metraje_autorizado_fibra:
        ordentrabajo?.ciudad_data?.metraje_autorizado || '',
    };

    reset({
      ...sanitizeDataResetForm(dataToReset),
    } as InstallAsignOTSaveFormData);
  }, [ordentrabajo, reset]);

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      onCancel={() => navigate(returnUrlInstallAsignadasOT)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          <Tab label="Órden de trabajo" value={2} {...a11yProps(2)} />
          <Tab label="Materiales" value={3} {...a11yProps(3)} />
          <Tab label="Fotos" value={4} {...a11yProps(4)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <InstallAsigTecnicoOTFormTab form={form} ordenTrabajo={ordentrabajo!} />
      </CustomTabPanel>

      {/* ========================= Orden de Trabajo ========================= */}
      <CustomTabPanel index={2} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <InstallAsigOrdenTrabajoFormTab
          form={form}
          ordenTrabajo={ordentrabajo!}
        />
      </CustomTabPanel>

      {/* ========================= Materiales ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <InstallAsigOTMaterialesFormTab
          form={form}
          ordenTrabajo={ordentrabajo!}
        />
      </CustomTabPanel>

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
    </TabsFormBoxScene>
  );
};

export default SaveOrdenTrabajo;
