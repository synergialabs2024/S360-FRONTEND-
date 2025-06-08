import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { returnUrlActivacionesInstallacionesOT } from '../../../pages/tables/ActivacionesInstalacionesMainPage';
import {
  actualizacionActivacionOrdenTrabajoFormSchema,
  getKeysFormErrorsMessage,
  gridSizeMdLg6,
  OrdenTrabajo,
  ToastWrapper,
} from '@/shared';
import { CustomTextField, SingleFormBoxScene } from '@/shared/components';
import {
  OrdenTrabajoTSQEnum,
  UpdateSerieOnt,
  UploadInstalacionONTData,
} from '@/actions/app';
import ActivacionInstallOTEquiposFormTab from './ActivacionInstallOTEquiposFormTab';
import { useGenericPATCH } from '@/actions/shared';
import { useInstalacionesStore } from '@/store/app';
import { EquiposUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import { useEffect } from 'react';

export type SaveActualizacionSerieOnuProps = {
  titleNode: React.ReactNode;
  ordentrabajo: OrdenTrabajo;
};

type SaveFormData = UpdateSerieOnt & {};

const SaveActualizacionSerieOnu: React.FC<SaveActualizacionSerieOnuProps> = ({
  titleNode,
  ordentrabajo,
}) => {
  const clearAll = useInstalacionesStore(state => state.clearAll);

  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(actualizacionActivacionOrdenTrabajoFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  ///* mutations ---------------------

  const uploadOTInstalacion = useGenericPATCH<
    UploadInstalacionONTData,
    OrdenTrabajo
  >(
    `/orden-trabajo/instalaciones/ont-serial/${ordentrabajo?.id!}/`,
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast: 'ONT actualizada con éxito',
      // navigate,
      returnUrl: returnUrlActivacionesInstallacionesOT,
      customOnSuccess() {
        clearAll();
        navigate(returnUrlActivacionesInstallacionesOT);
      },
    },
  );

  const equiposUtilizados = useInstalacionesStore.getState().equiposUtilizados;
  const selectedProductModel =
    useInstalacionesStore.getState().selectedProductModel;

  const selectedSerie = form.watch('new_serie_ont');

  useEffect(() => {
    const ont = equiposUtilizados?.at(0);
    const selectedSerie = ont?.savedSeries?.at(0);
    form.setValue('new_serie_ont', selectedSerie?.toString() ?? '');
  });

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

  useEffect(() => {
    console.log('selectedSerie', selectedSerie);
    console.log('equiposUtilizados?.at(0)', equiposUtilizados?.at(0));
    console.log('equiposUtilizados?.at(0)', equiposUtilizados?.at(0));
  });

  ///* effects ---------------------
  useEffect(() => {
    if (!ordentrabajo?.id) return;
    reset(ordentrabajo);
  }, [ordentrabajo, reset]);

  return (
    <SingleFormBoxScene
      titleNode={titleNode}
      onCancel={() => navigate(returnUrlActivacionesInstallacionesOT)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
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

      <ActivacionInstallOTEquiposFormTab ordenTrabajo={ordentrabajo} />
    </SingleFormBoxScene>
  );
};

export default SaveActualizacionSerieOnu;
