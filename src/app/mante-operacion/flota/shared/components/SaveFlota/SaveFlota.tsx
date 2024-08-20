import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateFlotaParamsBase,
  useCreateFlota,
  useFetchEmpleados,
  useUpdateFlota,
} from '@/actions/app';
import {
  EmployeeTypeEnumChoice,
  gridSizeMdLg6,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomCellphoneTextField,
  CustomNumberTextField,
  CustomTextField,
  SampleCheckbox,
  StepperBoxScene,
  useCustomStepper,
} from '@/shared/components';
import {
  Area,
  Ciudad,
  Departamento,
  Empleado,
  Flota,
  Pais,
  Provincia,
  Zona,
} from '@/shared/interfaces';
import { flotaFormSchema } from '@/shared/utils';
import { returnUrlFlotasPage } from '../../../pages/tables/FlotasPage';

export interface SaveFlotaProps {
  title: string;
  flota?: Flota;
}

type SaveFormData = CreateFlotaParamsBase & {};

const steps = ['Datos generales', 'Cobertura', 'Automotor'];

const SaveFlota: React.FC<SaveFlotaProps> = ({ title, flota }) => {
  ///* hooks --------------------
  const navigate = useNavigate();

  // stepper
  const { activeStep, disableNextStepBtn, handleBack, handleNext } =
    useCustomStepper({
      steps,
    });

  ///* form --------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(flotaFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* fetch data --------------------
  const {
    data: liderDataPagingRes,
    isLoading: isLoadingLider,
    isRefetching: isRefetchingLider,
  } = useFetchEmpleados({
    params: {
      page_size: 200,
      tipo_empleado: EmployeeTypeEnumChoice.TECNICO,
    },
  });
  const {
    data: auxiliarDataPagingRes,
    isLoading: isLoadingAuxiliar,
    isRefetching: isRefetchingAuxiliar,
  } = useFetchEmpleados({
    params: {
      page_size: 200,
      tipo_empleado: EmployeeTypeEnumChoice.TECNICO,
    },
  });

  ///* mutations --------------------
  const createFlotaMutation = useCreateFlota({
    navigate,
    returnUrl: returnUrlFlotasPage,
    enableErrorNavigate: false,
  });
  const updateFlotaMutation = useUpdateFlota<CreateFlotaParamsBase>({
    navigate,
    returnUrl: returnUrlFlotasPage,
  });

  ///* handlers --------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (flota?.id) {
      updateFlotaMutation.mutate({ id: flota.id!, data });
      return;
    }

    ///* create
    createFlotaMutation.mutate(data);
  };

  ///* effects --------------------
  useEffect(() => {
    if (!flota?.id) return;
    reset(flota);
  }, [flota, reset]);
  const customLoader =
    isLoadingLider ||
    isLoadingAuxiliar ||
    isRefetchingLider ||
    isRefetchingAuxiliar;
  useLoaders(customLoader);

  return (
    <StepperBoxScene
      titlePage={title}
      // steps
      steps={steps}
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      disableNextStepBtn={disableNextStepBtn}
      // action btns
      onCancel={() => navigate(returnUrlFlotasPage)}
      onSave={handleSubmit(onSave, () => {
        ToastWrapper.error('Faltan campos por requeridos');
      })}
    >
      {/* ========================= Datos Generales ========================= */}
      {activeStep === 0 && (
        <>
          <CustomTextField
            label="Nombre flota"
            name="name"
            control={form.control}
            defaultValue={form.getValues().name}
            error={errors.name}
            helperText={errors.name?.message}
            size={gridSizeMdLg6}
          />
          <CustomAutocomplete<Empleado>
            label="Lider"
            name="lider"
            // options
            options={liderDataPagingRes?.data?.items || []}
            valueKey="razon_social"
            defaultValue={form.getValues().lider}
            isLoadingData={isLoadingLider || isRefetchingLider}
            // vaidation
            control={form.control}
            error={errors.lider}
            helperText={errors.lider?.message}
            size={gridSizeMdLg6}
          />
          <CustomAutocomplete<Empleado>
            label="Auxiliar"
            name="auxiliar"
            // options
            options={auxiliarDataPagingRes?.data?.items || []}
            valueKey="razon_social"
            defaultValue={form.getValues().auxiliar}
            isLoadingData={isLoadingAuxiliar || isRefetchingAuxiliar}
            // vaidation
            control={form.control}
            error={errors.auxiliar}
            helperText={errors.auxiliar?.message}
            size={gridSizeMdLg6}
          />
        </>
      )}

      {activeStep === 10 && (
        <>
          <SampleCheckbox
            label="state"
            name="state"
            control={form.control}
            defaultValue={form.getValues().state}
            size={gridSizeMdLg6}
            isState
          />

          <CustomTextField
            label="Marca vehiculo"
            name="marca_vehiculo"
            control={form.control}
            defaultValue={form.getValues().marca_vehiculo}
            error={errors.marca_vehiculo}
            helperText={errors.marca_vehiculo?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Modelo vehiculo"
            name="modelo_vehiculo"
            control={form.control}
            defaultValue={form.getValues().modelo_vehiculo}
            error={errors.modelo_vehiculo}
            helperText={errors.modelo_vehiculo?.message}
            size={gridSizeMdLg6}
          />

          <CustomNumberTextField
            label="Anio vehiculo"
            name="anio_vehiculo"
            control={form.control}
            defaultValue={form.getValues().anio_vehiculo}
            error={errors.anio_vehiculo}
            helperText={errors.anio_vehiculo?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomTextField
            label="Placa vehiculo"
            name="placa_vehiculo"
            control={form.control}
            defaultValue={form.getValues().placa_vehiculo}
            error={errors.placa_vehiculo}
            helperText={errors.placa_vehiculo?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Color vehiculo"
            name="color_vehiculo"
            control={form.control}
            defaultValue={form.getValues().color_vehiculo}
            error={errors.color_vehiculo}
            helperText={errors.color_vehiculo?.message}
            size={gridSizeMdLg6}
          />

          <CustomTextField
            label="Email"
            name="email"
            type="email"
            control={form.control}
            defaultValue={form.getValues().email}
            error={errors.email}
            helperText={errors.email?.message}
            size={gridSizeMdLg6}
          />

          <CustomCellphoneTextField
            label="Telefono 1"
            name="telefono_1"
            control={form.control}
            defaultValue={form.getValues().telefono_1}
            error={errors.telefono_1}
            helperText={errors.telefono_1?.message}
            size={gridSizeMdLg6}
          />

          <CustomCellphoneTextField
            label="Telefono 2"
            name="telefono_2"
            control={form.control}
            defaultValue={form.getValues().telefono_2}
            error={errors.telefono_2}
            helperText={errors.telefono_2?.message}
            size={gridSizeMdLg6}
          />

          <CustomCellphoneTextField
            label="Telefono 3"
            name="telefono_3"
            control={form.control}
            defaultValue={form.getValues().telefono_3}
            error={errors.telefono_3}
            helperText={errors.telefono_3?.message}
            size={gridSizeMdLg6}
          />

          <CustomNumberTextField
            label="Zonas"
            name="zonas"
            control={form.control}
            defaultValue={form.getValues().zonas}
            error={errors.zonas}
            helperText={errors.zonas?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="User"
            name="user"
            control={form.control}
            defaultValue={form.getValues().user}
            error={errors.user}
            helperText={errors.user?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Area"
            name="area"
            control={form.control}
            defaultValue={form.getValues().area}
            error={errors.area}
            helperText={errors.area?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Departamento"
            name="departamento"
            control={form.control}
            defaultValue={form.getValues().departamento}
            error={errors.departamento}
            helperText={errors.departamento?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Lider"
            name="lider"
            control={form.control}
            defaultValue={form.getValues().lider}
            error={errors.lider}
            helperText={errors.lider?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Auxiliar"
            name="auxiliar"
            control={form.control}
            defaultValue={form.getValues().auxiliar}
            error={errors.auxiliar}
            helperText={errors.auxiliar?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Pais"
            name="pais"
            control={form.control}
            defaultValue={form.getValues().pais}
            error={errors.pais}
            helperText={errors.pais?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Provincia"
            name="provincia"
            control={form.control}
            defaultValue={form.getValues().provincia}
            error={errors.provincia}
            helperText={errors.provincia?.message}
            size={gridSizeMdLg6}
            min={0}
          />

          <CustomNumberTextField
            label="Ciudad"
            name="ciudad"
            control={form.control}
            defaultValue={form.getValues().ciudad}
            error={errors.ciudad}
            helperText={errors.ciudad?.message}
            size={gridSizeMdLg6}
            min={0}
          />
          <CustomAutocomplete<Zona>
            label="Zonas"
            name="zonas"
            // options
            options={[] || []}
            valueKey="name"
            defaultValue={form.getValues().zonas}
            isLoadingData={false} // TODO: add loading
            // vaidation
            control={form.control}
            error={errors.zonas}
            helperText={errors.zonas?.message}
            size={gridSizeMdLg6}
          />

          <CustomAutocomplete<Area>
            label="Area"
            name="area"
            // options
            options={[] || []}
            valueKey="name"
            defaultValue={form.getValues().area}
            isLoadingData={false} // TODO: add loading
            // vaidation
            control={form.control}
            error={errors.area}
            helperText={errors.area?.message}
            size={gridSizeMdLg6}
          />

          <CustomAutocomplete<Departamento>
            label="Departamento"
            name="departamento"
            // options
            options={[] || []}
            valueKey="name"
            defaultValue={form.getValues().departamento}
            isLoadingData={false} // TODO: add loading
            // vaidation
            control={form.control}
            error={errors.departamento}
            helperText={errors.departamento?.message}
            size={gridSizeMdLg6}
          />

          <CustomAutocomplete<Pais>
            label="Pais"
            name="pais"
            // options
            options={[] || []}
            valueKey="name"
            defaultValue={form.getValues().pais}
            isLoadingData={false} // TODO: add loading
            // vaidation
            control={form.control}
            error={errors.pais}
            helperText={errors.pais?.message}
            size={gridSizeMdLg6}
          />

          <CustomAutocomplete<Provincia>
            label="Provincia"
            name="provincia"
            // options
            options={[] || []}
            valueKey="name"
            defaultValue={form.getValues().provincia}
            isLoadingData={false} // TODO: add loading
            // vaidation
            control={form.control}
            error={errors.provincia}
            helperText={errors.provincia?.message}
            size={gridSizeMdLg6}
          />

          <CustomAutocomplete<Ciudad>
            label="Ciudad"
            name="ciudad"
            // options
            options={[] || []}
            valueKey="name"
            defaultValue={form.getValues().ciudad}
            isLoadingData={false} // TODO: add loading
            // vaidation
            control={form.control}
            error={errors.ciudad}
            helperText={errors.ciudad?.message}
            size={gridSizeMdLg6}
          />
        </>
      )}
    </StepperBoxScene>
  );
};

export default SaveFlota;
