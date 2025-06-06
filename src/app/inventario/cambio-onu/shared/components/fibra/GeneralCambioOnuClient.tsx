import { Tab } from '@mui/material';
import { useEffect } from 'react';

import {
  cambioOnuInventarioFormSchema,
  getKeysFormErrorsMessage,
  gridSize,
  gridSizeMdLg10,
  gridSizeMdLg6,
  LineaServicio,
  ToastWrapper,
  useTabOnlyNuqs,
} from '@/shared';
import {
  a11yProps,
  CustomTabPanel,
  CustomTextField,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import { useRubroStore } from '@/store/app/rubros';
import { ClienteFibraTitle } from '@/app/cliente/cliente/shared/components';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  LineaServicioTSQEnum,
  UpdateSerieOnt,
  UploadInstalacionONTData,
} from '@/actions/app';
import { useInstalacionesStore } from '@/store/app';
import { EquiposUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import { returnUrlCambioOnuClientesFibraPage } from '../../../pages/tables/ClientesCambioOnuMainPage';
import { useGenericPATCH } from '@/actions/shared';
import CambioOnuEquiposFormTab from '../form/CambioOnuEquiposFormTab';

export type GeneralCambioOnuClientProps = {
  serviceLine?: LineaServicio;
};

type SaveFormData = UpdateSerieOnt & {
  serie_onu_nueva: string;
  producto_onu_nueva: string;
};

const GeneralCambioOnuClient: React.FC<GeneralCambioOnuClientProps> = ({
  serviceLine,
}) => {
  const clearAll = useInstalacionesStore(state => state.clearAll);

  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(cambioOnuInventarioFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  ///* mutations ---------------------

  const uploadOTInstalacion = useGenericPATCH<
    UploadInstalacionONTData,
    LineaServicio
  >(
    `/linea-servicio/cambio-onu-simple/${serviceLine?.id!}/`,
    LineaServicioTSQEnum.LINEASERVICIOS,
    {
      customMessageToast: 'ONT actualizada con éxito',
      // navigate,
      returnUrl: returnUrlCambioOnuClientesFibraPage,
      customOnSuccess() {
        clearAll();
        navigate(returnUrlCambioOnuClientesFibraPage);
      },
    },
  );

  ///* hooks ----------------
  const { tabValue, handleTabChange } = useTabOnlyNuqs();

  ///* global state ----------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAll);

  useEffect(() => {
    return () => {
      clearAllRubroStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const equiposUtilizados = useInstalacionesStore.getState().equiposUtilizados;
  const selectedProductModel =
    useInstalacionesStore.getState().selectedProductModel;

  const selectedSerie = form.watch('new_serie_ont');

  ///* handlers ---------------------
  const onSave = async () => {
    if (!equiposUtilizados?.length)
      return ToastWrapper.error('No se han seleccionado equipos');

    let thereAreEquiposWithoutSerie = false;
    let equiposWithoutSerie: EquiposUtilizadosOTTableType = {} as any;
    equiposUtilizados?.forEach(equipo => {
      if (!equipo.savedSeries?.length) {
        thereAreEquiposWithoutSerie = true;
        equiposWithoutSerie = equipo;
      }
    });
    if (thereAreEquiposWithoutSerie)
      return ToastWrapper.error(
        `El equipo ${equiposWithoutSerie?.producto_data?.nombre} no tiene serie seleccionada`,
      );

    const ont = equiposUtilizados?.at(0);
    if (!ont || !ont?.savedSeries?.length)
      return ToastWrapper.error('No se han seleccionado la serie de la ONT');
    if (!selectedProductModel)
      return ToastWrapper.error('No se ha seleccionado un modelo de ONT');
    if (selectedProductModel !== ont?.modelo_data?.codigo)
      return ToastWrapper.error(
        'El modelo de ONT seleccionado no coincide con el modelo del equipo seleccionado',
      );

    const selectedSerie = ont?.savedSeries?.at(0);

    if (selectedSerie === form.getValues().serie_ont)
      return ToastWrapper.error(
        'Debe seleccionar una ONT distinta a la actual',
      );

    uploadOTInstalacion.mutate({
      serie_ont: selectedSerie,
    });
  };

  if (!serviceLine) return null;

  return (
    <TabsFormBoxScene
      titlePageNode={<ClienteFibraTitle serviceLine={serviceLine!} />}
      showBtns={false}
      // tabs -------------
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="CAMBIO ONU" value={1} {...a11yProps(1)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
      onCancel={() => navigate(returnUrlCambioOnuClientesFibraPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      {/* ========================= Cambio Onu ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg10}>
        <CustomTextField
          label="Serie Actual Ont"
          name="serie_ont"
          control={form.control}
          defaultValue={form.getValues().serie_ont}
          error={errors.serie_ont}
          helperText={errors.serie_ont?.message}
          disabled
          size={gridSizeMdLg6}
        />
        <CustomTextField
          label="Nueva serie Ont"
          name="new_serie_ont"
          control={form.control}
          defaultValue={selectedSerie}
          error={errors.new_serie_ont}
          helperText={errors.new_serie_ont?.message}
          disabled
          size={gridSizeMdLg6}
        />

        <CambioOnuEquiposFormTab serviceLine={serviceLine} />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default GeneralCambioOnuClient;
