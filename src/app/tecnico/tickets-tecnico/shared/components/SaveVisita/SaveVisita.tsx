import { Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  BucketKeyTicketEnumChoice,
  BucketTypeEnumChoice,
  EquipoUtilizadosInstallOT,
  getKeysFormErrorsMessage,
  gridSize,
  gridSizeMdLg9,
  MaterialUtilizadosInstallOT,
  TipoProductoEnumChoice,
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
import { ROUTER_PATHS } from '@/router/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ticketTecnicoFormSchema } from '@/shared/utils/validation-schemas/app/tickets/ticket-tecnico.schema';
import { InstallAsigTicketMaterialesFormTab } from '../form';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import InstallAsigTecnicoTicketFormTab from '../form/InstallAsigTecnicoTicketFormTab';
import InstallAsigTicketSolucionFormTab from '../form/InstallAsigTicketSolucionFormTab';
import {
  CreateTicketParamsBase,
  TicketTSQEnum,
  UploadTicketVisitaAsignData,
} from '@/actions/app/tickets';
import { MaterialesUtilizadosOTTableType } from '../form/materiales/MaterialesUtilizadosTicketAsignFormPart';
import { useInstalacionesStore } from '@/store/app';
import { EquiposUtilizadosOTTableType } from '../form/EquiposUtilizadosTicketAsignFormPart';
import { uploadFileToBucket } from '@/actions/statics-api';
import { useUiStore } from '@/store/ui';
import { useGenericPATCH } from '@/actions/shared';
import { useState } from 'react';
import AuditoriaTicketRequestUpd from '../form/AuditoriaTicketRequestUpd';

export const returnUrlTicketVisitaTecnico = ROUTER_PATHS.tecnico.ticketsNav;

export interface SaveVisitaProps {
  titleNode: React.ReactNode;
  ticket?: Ticket;
}

export type InstallAsignTicketTecnicoSaveFormData = CreateTicketParamsBase & {
  is_cambio_onu?: boolean;
};

const SaveVisita: React.FC<SaveVisitaProps> = ({ titleNode, ticket }) => {
  ///* local states ---------------------
  const [openRequestUpdOTModal, setOpenRequestUpdOTModal] = useState(false);
  ///* mutations ---------------------
  const uploadTicketVisitaTecnico = useGenericPATCH<
    UploadTicketVisitaAsignData,
    Ticket
  >(`/ticket-tecnico/upload/${ticket?.id!}/`, TicketTSQEnum.TICKETS, {
    customMessageToast: 'Ticket de visita gestionado con éxito',
    // navigate,
    returnUrl: returnUrlTicketVisitaTecnico,
    customOnSuccess() {
      clearAll();
      navigate(returnUrlTicketVisitaTecnico);
    },
  });

  const updCambioOnu = useGenericPATCH<any, Ticket>(
    `/ticket-tecnico/cambio-onu/${ticket?.id}/`,
    TicketTSQEnum.TICKETS,
    {
      customMessageToast: 'Cambio Onu realizado correctamente.',
    },
  );

  ///* global states ---------------------
  const clearAll = useInstalacionesStore(state => state.clearAll);
  const setIsGlobalLoading = useUiStore(state => state.setIsGlobalLoading);

  ///* form ---------------------
  const form = useForm<Ticket>({
    resolver: yupResolver(ticketTecnicoFormSchema) as any,
  });

  const { handleSubmit } = form;
  ///* states ---------------------
  // const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);
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
  const onSave = async (data: InstallAsignTicketTecnicoSaveFormData) => {
    const equiposUtilizados: EquiposUtilizadosOTTableType[] =
      useInstalacionesStore.getState().equiposUtilizados;
    const materialesUtilizados: MaterialesUtilizadosOTTableType[] =
      useInstalacionesStore.getState().materialesUtilizados;
    const selectedFibraModel =
      useInstalacionesStore.getState().selectedFibraModel;

    // validate series in equipos ----------
    let thereAreEmptySeries = false;
    let equipo: EquiposUtilizadosOTTableType = null as any;
    let thereAreEquiposWithoutQuantity = false;
    equiposUtilizados.forEach(eq => {
      if (eq.containsSeries && !eq.savedSeries.length) {
        thereAreEmptySeries = true;
        equipo = eq;
      }
      if (!eq.usedQuantity) {
        thereAreEquiposWithoutQuantity = true;
        equipo = eq;
      }
    });
    if (thereAreEmptySeries)
      return ToastWrapper.error(
        `No se han seleccionado series en los equipos: ${equipo.producto_data?.codigo}`,
      );
    if (thereAreEquiposWithoutQuantity)
      return ToastWrapper.error(
        `No se puede guardar equipos sin cantidad utilizada: ${equipo.producto_data?.codigo}`,
      );

    // validate materiales =================
    let thereAreMaterialsWithoutQuantity = false;
    let material: MaterialesUtilizadosOTTableType = null as any;
    console.log('materialesUtilizados', materialesUtilizados);
    materialesUtilizados.forEach(mat => {
      if (!mat.usedQuantity) {
        thereAreMaterialsWithoutQuantity = true;
        material = mat;
      }
    });
    if (thereAreMaterialsWithoutQuantity)
      return ToastWrapper.error(
        `No se puede guardar materiales sin cantidad utilizada: ${material.producto_data?.codigo}`,
      );

    // fibra -------------
    const fibraItems: MaterialesUtilizadosOTTableType[] =
      materialesUtilizados.filter(
        mat => mat?.producto_data?.tipo === TipoProductoEnumChoice.FIBRA,
      ) || [];
    if (fibraItems.length > 1) {
      return ToastWrapper.error(
        'Solo se puede seleccionar un item de tipo FIBRA',
      );
    }

    const firstFibra = fibraItems?.[0];

    if (firstFibra) {
      if (firstFibra?.usedQuantity > 1 && firstFibra.isFibraPreconect) {
        return ToastWrapper.error(
          'Solo se puede seleccionar un item de tipo FIBRA modelo Preconecteriorizada',
        );
      }

      if (firstFibra.modelo_data?.codigo !== selectedFibraModel) {
        return ToastWrapper.error(
          `El modelo de la fibra no coincide con el modelo seleccionado. Requedido: ${selectedFibraModel} - Provisto: ${firstFibra.modelo_data?.codigo}`,
        );
      }
    }

    const mappedEquiposUtilizados: EquipoUtilizadosInstallOT[] =
      equiposUtilizados?.map(
        eq =>
          ({
            cantidad: (eq.usedQuantity || 0).toString(),
            producto: eq.producto_data?.id!,
            series: eq.savedSeries?.map(s => s) || [],
            codigo: eq.producto_data?.codigo!,
            producto_data: {
              codigo: eq.producto_data?.codigo!,
              nombre: eq.producto_data?.nombre!,
              tipo: eq.producto_data?.tipo!,
              modeloName: eq.modelo_data?.nombre!,
            },
          }) as EquipoUtilizadosInstallOT,
      ) || [];
    const mappedMaterialesUtilizados: MaterialUtilizadosInstallOT[] =
      materialesUtilizados?.map(
        mat =>
          ({
            cantidad: (mat.usedQuantity || 0).toString(),
            producto: mat.producto_data?.id!,
            series: mat.savedSeries?.map(s => s) || [],
            codigo: mat.producto_data?.codigo!,
            producto_data: {
              codigo: mat.producto_data?.codigo!,
              nombre: mat.producto_data?.nombre!,
              tipo: mat.producto_data?.tipo!,
              modeloName: mat.modelo_data?.nombre!,
            },
          }) as MaterialUtilizadosInstallOT,
      ) || [];

    ///* upload images -------
    // validate imgs
    let thereAreEmptyRequiredImages = false;
    let emptyImageName: string | undefined = undefined;
    requiredImages.forEach(({ isRequired, image, label }) => {
      if (isRequired && !image) {
        thereAreEmptyRequiredImages = true;
        emptyImageName = label;
      }
    });
    if (thereAreEmptyRequiredImages) {
      ToastWrapper.error(`La imagen ${emptyImageName} es requerida`);
      return;
    }

    setIsGlobalLoading(true);
    // upload images ---
    // required
    const [
      antesSolucionPhoto,
      despuesSolucionPhoto,
      testVelocidadPhoto,
      potenciaAntesSolucionPhoto,
      potenciaDespuesSolucionPhoto,
      problemaEncontradoPhoto,
      solucionPhoto,
    ] = await Promise.all([
      uploadFileToBucket({
        file: fotoAntesSolucion!,
        file_name: BucketKeyTicketEnumChoice.FOTO_ANTES_SOLUCION,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      }),
      uploadFileToBucket({
        file: fotoDespuesSolucion!,
        file_name: BucketKeyTicketEnumChoice.FOTO_DESPUES_SOLUCION,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      }),
      uploadFileToBucket({
        file: fotoTestVelocidad!,
        file_name: BucketKeyTicketEnumChoice.FOTO_TEST_VELOCIDAD,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      }),
      uploadFileToBucket({
        file: fotoPotenciaAntesSolucion!,
        file_name: BucketKeyTicketEnumChoice.FOTO_POTENCIA_ANTES_SOLUCION,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      }),
      uploadFileToBucket({
        file: fotoPotenciaDespuesSolucion!,
        file_name: BucketKeyTicketEnumChoice.FOTO_POTENCIA_DESPUES_SOLUCION,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      }),
      uploadFileToBucket({
        file: fotoProblemaEncontrado!,
        file_name: BucketKeyTicketEnumChoice.FOTO_PROBLEMA_ENCONTRADO,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      }),
      uploadFileToBucket({
        file: fotoSolucion!,
        file_name: BucketKeyTicketEnumChoice.FOTO_SOLUCION,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      }),
    ]);

    // Validación de URLs requeridos
    // Validación de URLs requeridas (existentes o recién subidas)
    const requiredUrls = [
      {
        url: antesSolucionPhoto?.streamUlr || ticket?.url_foto_antes_solucion,
        name: 'Foto antes solución',
      },
      {
        url:
          despuesSolucionPhoto?.streamUlr || ticket?.url_foto_despues_solucion,
        name: 'Foto después solución',
      },
      {
        url: testVelocidadPhoto?.streamUlr || ticket?.url_foto_test_velocidad,
        name: 'Test de velocidad',
      },
      {
        url:
          potenciaAntesSolucionPhoto?.streamUlr ||
          ticket?.url_foto_potencia_antes_solucion,
        name: 'Potencia antes solución',
      },
      {
        url:
          potenciaDespuesSolucionPhoto?.streamUlr ||
          ticket?.url_foto_potencia_despues_solucion,
        name: 'Potencia después solución',
      },
      {
        url:
          problemaEncontradoPhoto?.streamUlr ||
          ticket?.url_foto_problema_encontrado,
        name: 'Problema encontrado',
      },
      {
        url: solucionPhoto?.streamUlr || ticket?.url_foto_solucion,
        name: 'Solución',
      },
    ];

    const missingUrl = requiredUrls.find(item => !item.url || item.url === '');
    if (missingUrl) {
      ToastWrapper.error(
        `La imagen ${missingUrl.name} no se subió correctamente y es requerida`,
      );
      return;
    }

    let entregaMeshPhoto = null;
    if (fotoEntregaMesh) {
      entregaMeshPhoto = await uploadFileToBucket({
        file: fotoEntregaMesh!,
        file_name: BucketKeyTicketEnumChoice.FOTO_ENTREGA_MESH,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      });
    }

    let entregaUpsPhoto = null;
    if (fotoEntregaUps) {
      entregaUpsPhoto = await uploadFileToBucket({
        file: fotoEntregaUps!,
        file_name: BucketKeyTicketEnumChoice.FOTO_ENTREGA_UPS,
        bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
      });
    }

    uploadTicketVisitaTecnico.mutate({
      solucion_tecnico: data.solucion_tecnico,
      observacion_extra_solucion_visita: data.observacion_extra_solucion_visita,
      modelo_fibra_utilizada: data.modelo_fibra_utilizada,
      punta_inicial_fibra: data.punta_inicial_fibra,
      punta_final_fibra: data.punta_final_fibra,
      url_foto_antes_solucion: antesSolucionPhoto?.streamUlr,
      url_foto_despues_solucion: despuesSolucionPhoto?.streamUlr,
      url_foto_test_velocidad: testVelocidadPhoto?.streamUlr,
      url_foto_potencia_antes_solucion: potenciaAntesSolucionPhoto?.streamUlr,
      url_foto_potencia_despues_solucion:
        potenciaDespuesSolucionPhoto?.streamUlr,
      url_foto_problema_encontrado: problemaEncontradoPhoto?.streamUlr,
      url_foto_solucion: solucionPhoto?.streamUlr,

      equipos_utilizados: mappedEquiposUtilizados,
      materiales_utilizados: mappedMaterialesUtilizados,

      asunto_ticket_tecnico: ticket?.asunto_ticket,

      ...(entregaMeshPhoto && {
        url_foto_entrega_mesh: entregaMeshPhoto?.streamUlr,
      }),
      ...(entregaUpsPhoto && {
        url_foto_entrega_ups: entregaUpsPhoto?.streamUlr,
      }),
    });

    if (data.is_cambio_onu) {
      updCambioOnu.mutateAsync({});
    }
  };

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      // action btns
      onCancel={() => navigate(returnUrlTicketVisitaTecnico)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(`Error en: ${getKeysFormErrorsMessage(errors)}`);
      })}
      onReject={() => {
        setOpenRequestUpdOTModal(true);
      }}
      // tabs
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información general" value={1} {...a11yProps(1)} />
          <Tab label="Materiales" value={2} {...a11yProps(2)} />
          <Tab
            label="Informacion sobre la visita"
            value={3}
            {...a11yProps(3)}
          />
          <Tab label="Fotos" value={4} {...a11yProps(4)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg9}>
        <InstallAsigTecnicoTicketFormTab form={form} ticket={ticket!} />
      </CustomTabPanel>

      {/* ========================= Materiales ========================= */}
      <CustomTabPanel index={2} value={tabValue}>
        <InstallAsigTicketMaterialesFormTab form={form} ticket={ticket!} />
      </CustomTabPanel>
      {/* ========================= Informacion sobre la visita ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <InstallAsigTicketSolucionFormTab form={form} ticket={ticket!} />
      </CustomTabPanel>
      {/* ========================= Fotos ========================= */}
      <CustomTabPanel index={4} value={tabValue}>
        {requiredImages.map(({ label, image, setImage }) => (
          <UploadImageDropZoneComponent
            key={label}
            buttonLabel={label}
            selectedImage={image}
            setSelectedImage={setImage as any}
            //maxFileSizeMB={5}
          />
        ))}
      </CustomTabPanel>

      {/* ========================= modals ========================= */}
      {/* <PrerejectInstalacionAsignadaOTModal
        open={isOpenRejectModal}
        onClose={() => setIsOpenRejectModal(false)}
        ordenTrabajo={ordentrabajo!}
      /> */}
      <AuditoriaTicketRequestUpd
        open={openRequestUpdOTModal}
        onClose={() => setOpenRequestUpdOTModal(false)}
        ticket={ticket!}
      />
    </TabsFormBoxScene>
  );
};

export default SaveVisita;
