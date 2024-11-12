import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateOrdenTrabajoParamsBase,
  OrdenTrabajoTSQEnum,
} from '@/actions/app';
import { UploadInstalacionOTAsignData } from '@/actions/app/tecnico/orden-trabajo-action-types.interface';
import { useGenericPATCH } from '@/actions/shared';
import { uploadFileToBucket } from '@/actions/statics-api';
import { EquipoVentasDetalle } from '@/app/comercial/preventa/shared/components';
import {
  BucketKeyNameEnumChoice,
  BucketTypeEnumChoice,
  EquipoUtilizadosInstallOT,
  EstadoActivacionEnumChoice,
  gridSize,
  gridSizeMdLg9,
  MaterialUtilizadosInstallOT,
  Nap,
  Preventa,
  SolicitudServicio,
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
import { OrdenTrabajo } from '@/shared/interfaces';
import {
  getKeysFormErrorsMessage,
  ordenTrabajoFormSchema,
  sanitizeDataResetForm,
} from '@/shared/utils';
import { useInstalacionesStore } from '@/store/app';
import { returnUrlInstallAsignadasOT } from '../../../pages/tables/InstalacionesAsignadasOTMainPage';
import { useONTInstallAsignadaOT } from '../../hooks';
import {
  EquiposUtilizadosOTTableType,
  InstallAsigOrdenTrabajoFormTab,
  InstallAsigOTMaterialesFormTab,
  InstallAsigTecnicoOTFormTab,
  MaterialesUtilizadosOTTableType,
  PrerejectInstalacionAsignadaOTModal,
} from '../form';

export interface SaveOrdenTrabajoProps {
  titleNode: React.ReactNode;
  ordentrabajo?: OrdenTrabajo;
}

export type InstallAsignOTSaveFormData = CreateOrdenTrabajoParamsBase &
  Partial<SolicitudServicio> &
  Partial<Preventa> & {
    metraje_autorizado_fibra: string;
    rawNap?: Nap;
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
  useONTInstallAsignadaOT({ ordenTrabajo: ordentrabajo! });

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

  ///* states ---------------------
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);

  ///* global states ---------------------
  const clearAll = useInstalacionesStore(state => state.clearAll);

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
  const uploadOTInstalacion = useGenericPATCH<
    UploadInstalacionOTAsignData,
    OrdenTrabajo
  >(
    `/orden-trabajo/instalaciones/upload/${ordentrabajo?.id!}/`,
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast: 'Orden de trabajo cargada con éxito',
      // navigate,
      returnUrl: returnUrlInstallAsignadasOT,
      customOnSettled() {
        clearAll();
        navigate(returnUrlInstallAsignadasOT);
      },
    },
  );

  ///* handlers ---------------------
  const onSave = async (data: InstallAsignOTSaveFormData) => {
    if (!isValid) return;
    if (
      ordentrabajo?.estado_activacion !== EstadoActivacionEnumChoice.GESTIONADA
    )
      return ToastWrapper.error(
        'La orden de trabajo no ha sido gestionada por Activaciones',
      );

    ///* validate equipos & materiales ----------
    const equiposAdicionales: EquipoVentasDetalle[] =
      ordentrabajo?.preventa_data?.equipos_venta_detalle || [];
    const equiposUtilizados: EquiposUtilizadosOTTableType[] =
      useInstalacionesStore.getState().equiposUtilizados;
    const materialesUtilizados: MaterialesUtilizadosOTTableType[] =
      useInstalacionesStore.getState().materialesUtilizados;
    const serieActicacion = ordentrabajo?.serie_ont;

    if (!equiposUtilizados.length)
      return ToastWrapper.error(
        'No se han agregado equipos utilizados en la instalación',
      );
    if (!materialesUtilizados.length)
      return ToastWrapper.error(
        'No se han agregado materiales utilizados en la instalación',
      );

    // validate series in equipos
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
    const ont: EquiposUtilizadosOTTableType | undefined =
      equiposUtilizados.find(
        eq => eq.producto_data?.tipo === TipoProductoEnumChoice.ONT,
      );
    if (!ont)
      return ToastWrapper.error(
        'No se ha seleccionado la ONT en los equipos utilizados',
      );
    if (+(ont?.usedQuantity || 0) > 1)
      return ToastWrapper.error('Solo se puede seleccionar una ONT');
    const seriesOnt = ont?.savedSeries;
    if (+(seriesOnt?.length || 0) > 1)
      return ToastWrapper.error(
        'Solo se puede seleccionar una serie para la ONT',
      );
    if (seriesOnt?.at(0) !== serieActicacion)
      return ToastWrapper.error(
        `La serie de la ONT no coincide con la serie de activación. Requedida: ${serieActicacion} - Provista: ${seriesOnt?.at(
          0,
        )}`,
      );

    // validate materiales
    let thereAreMaterialsWithoutQuantity = false;
    let material: MaterialesUtilizadosOTTableType = null as any;
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

    // validate equipos adicionales
    let thereAreEmptyEquiposAdicionales = false;
    let eqAdicional: EquipoVentasDetalle = null as any;
    equiposAdicionales.forEach(equipo => {
      const equipoUtilizado = equiposUtilizados.find(
        item => item.producto_data?.codigo === equipo.codigo,
      );
      if (!equipoUtilizado) {
        thereAreEmptyEquiposAdicionales = true;
        eqAdicional = equipo;
      }
    });
    if (thereAreEmptyEquiposAdicionales)
      return ToastWrapper.error(
        `Faltan equipos adicionales: ${eqAdicional?.codigo}`,
      );

    let thereAreNotEqualQuantityEquiposAdicionales = false;
    equiposAdicionales.forEach(equipo => {
      const equipoUtilizado = equiposUtilizados.find(
        item => item.producto_data?.codigo === equipo.codigo,
      );
      if (+(equipoUtilizado?.usedQuantity || 0) !== +(equipo?.cantidad || 0)) {
        thereAreNotEqualQuantityEquiposAdicionales = true;
        eqAdicional = equipo;
      }
    });
    if (thereAreNotEqualQuantityEquiposAdicionales)
      return ToastWrapper.error(
        `La cantidad de equipos adicionales no coincide: ${eqAdicional?.codigo} espera ${eqAdicional?.cantidad}`,
      );

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
    // upload images ---
    // required
    const [
      ontPhoto,
      potenciaONTPhoto,
      etiquetaPhoto,
      napPhoto,
      potenciaNAPPhoto,
      testSpeedPhoto,
    ] = await Promise.all([
      uploadFileToBucket({
        file: fotoONT!,
        file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
        bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
      }),
      uploadFileToBucket({
        file: fotoPotenciaONT!,
        file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
        bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
      }),
      uploadFileToBucket({
        file: fotoEtiqueta!,
        file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
        bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
      }),
      uploadFileToBucket({
        file: fotoNAP!,
        file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
        bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
      }),
      uploadFileToBucket({
        file: fotoPotenciaNAP!,
        file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
        bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
      }),
      uploadFileToBucket({
        file: fotoTestSpeed!,
        file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
        bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
      }),
    ]);

    // not required
    let ontEncontradoPhoto = null;
    if (fotoONTEncontradoCasa) {
      ontEncontradoPhoto = await uploadFileToBucket({
        file: fotoONTEncontradoCasa!,
        file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
        bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
      });
    }
    let actaEntregaUPSPhoto = null;
    if (fotoActaEntregaUPS) {
      actaEntregaUPSPhoto = await uploadFileToBucket({
        file: fotoActaEntregaUPS!,
        file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
        bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
      });
    }
    let premioPhoto = null;
    if (fotoPremio) {
      premioPhoto = await uploadFileToBucket({
        file: fotoPremio!,
        file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
        bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
      });
    }

    ///* upd -------
    if (ordentrabajo?.id) {
      uploadOTInstalacion.mutate({
        equipos_utilizados: mappedEquiposUtilizados,
        materiales_utilizados: mappedMaterialesUtilizados,
        punta_inicial_fibra: data.punta_inicial_fibra,
        punta_final_fibra: data.punta_final_fibra,
        metraje_utilizado_fibra: data.metraje_utilizado_fibra,
        metraje_exedente_fibra: data.metraje_exedente_fibra,
        serie_ont: data.serie_ont,
        potencia_ont: data.potencia_ont,
        observaciones_adicionales: data.observaciones_adicionales,

        nap: data.nap,
        distancia_nap: data.distancia_nap!,
        puerto_nap: data.puerto_nap!,

        url_foto_ont: ontPhoto?.streamUlr,
        url_foto_potencia_ont: potenciaONTPhoto?.streamUlr,
        url_foto_etiqueta: etiquetaPhoto?.streamUlr,
        url_foto_nap: napPhoto?.streamUlr,
        url_foto_potencia_nap: potenciaNAPPhoto?.streamUlr,
        url_foto_test_speed: testSpeedPhoto?.streamUlr,

        ...(ontEncontradoPhoto && {
          url_foto_ont_encontrado_casa: ontEncontradoPhoto?.streamUlr,
        }),
        ...(actaEntregaUPSPhoto && {
          url_foto_acta_entrega_ups: actaEntregaUPSPhoto?.streamUlr,
        }),
        ...(premioPhoto && { url_foto_premio: premioPhoto?.streamUlr }),
      });
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
      rawNap: ordentrabajo?.nap_data || undefined,
    };

    reset({
      ...sanitizeDataResetForm(dataToReset),
    } as InstallAsignOTSaveFormData);
  }, [ordentrabajo, reset]);

  useEffect(() => {
    return () => {
      clearAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabsFormBoxScene
      titlePageNode={titleNode}
      // action btns
      onCancel={() => navigate(returnUrlInstallAsignadasOT)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
      onReject={() => {
        setIsOpenRejectModal(true);
      }}
      // tabs
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

      {/* ========================= modals ========================= */}
      <PrerejectInstalacionAsignadaOTModal
        open={isOpenRejectModal}
        onClose={() => setIsOpenRejectModal(false)}
        ordenTrabajo={ordentrabajo!}
      />
    </TabsFormBoxScene>
  );
};

export default SaveOrdenTrabajo;
