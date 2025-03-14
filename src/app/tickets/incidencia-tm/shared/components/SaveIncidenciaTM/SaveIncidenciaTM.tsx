import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  SampleCheckbox,
  CustomTextField,
  SingleFormBoxScene,
  CustomAutocompleteArrString,
} from '@/shared/components';
import {
  useCreateIncidenciaTM,
  useUpdateIncidenciaTM,
  CreateIncidenciaTMParamsBase,
} from '@/actions/app';
import {
  IncidenciaTM,
  gridSizeMdLg6,
  PermissionsEnum,
  incidenciaTMFormSchema,
  PRIORIDAD_TICKET_MASIVO_ARRAY_CHOICES,
} from '@/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlIncidenciaTMPage } from '../../../pages/tables/IncidenciaTMPage';

export interface SaveIncidenciaTMProps {
  title: string;
  incidenciaTM?: IncidenciaTM;
}

type SaveFormData = CreateIncidenciaTMParamsBase & {};

const SaveIncidenciaTM: React.FC<SaveIncidenciaTMProps> = ({
  title,
  incidenciaTM,
}) => {
  useCheckPermission(PermissionsEnum.tecnico_view_incidenciaticketmasivo);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(incidenciaTMFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createIncidenciaTMMutation = useCreateIncidenciaTM({
    navigate,
    returnUrl: returnUrlIncidenciaTMPage,
    enableErrorNavigate: false,
  });
  const updateIncidenciaTMMutation =
    useUpdateIncidenciaTM<CreateIncidenciaTMParamsBase>({
      navigate,
      returnUrl: returnUrlIncidenciaTMPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (incidenciaTM?.id) {
      updateIncidenciaTMMutation.mutate({ id: incidenciaTM.id!, data });
      return;
    }

    ///* create
    createIncidenciaTMMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!incidenciaTM?.id) return;
    reset(incidenciaTM);
  }, [incidenciaTM, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlIncidenciaTMPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocompleteArrString
        label="Prioridad"
        name="prioridad"
        control={form.control}
        defaultValue={form.getValues('prioridad')}
        options={PRIORIDAD_TICKET_MASIVO_ARRAY_CHOICES}
        isLoadingData={false}
        error={errors.prioridad}
        helperText={errors.prioridad?.message}
        size={gridSizeMdLg6}
        disableClearable
      />

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
      <SampleCheckbox
        label="Restringir Asunto Ticket"
        name="restringir_asuntos_ticket"
        control={form.control}
        defaultValue={form.getValues().restringir_asuntos_ticket}
      />
    </SingleFormBoxScene>
  );
};

export default SaveIncidenciaTM;
