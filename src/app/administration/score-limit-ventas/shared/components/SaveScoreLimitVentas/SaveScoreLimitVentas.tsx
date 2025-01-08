import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateScoreLimitVentasParamsBase,
  useCreateScoreLimitVentas,
  useUpdateScoreLimitVentas,
} from '@/actions/app';
import { ToastWrapper } from '@/shared';
import {
  CustomNumberTextField,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { ScoreLimitVentas } from '@/shared/interfaces';
import {
  getKeysFormErrorsMessage,
  scoreLimitVentasFormSchema,
} from '@/shared/utils';
import { returnUrlScoresLimitVentasPage } from '../../../pages/tables/ScoresLimitVentasPage';

export interface SaveScoreLimitVentasProps {
  title: string;
  scorelimitventas?: ScoreLimitVentas;
}

type SaveFormData = CreateScoreLimitVentasParamsBase & {};

const SaveScoreLimitVentas: React.FC<SaveScoreLimitVentasProps> = ({
  title,
  scorelimitventas,
}) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(scoreLimitVentasFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations ---------------------
  const createScoreLimitVentasMutation = useCreateScoreLimitVentas({
    navigate,
    returnUrl: returnUrlScoresLimitVentasPage,
    enableErrorNavigate: false,
  });
  const updateScoreLimitVentasMutation =
    useUpdateScoreLimitVentas<CreateScoreLimitVentasParamsBase>({
      navigate,
      returnUrl: returnUrlScoresLimitVentasPage,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (scorelimitventas?.id) {
      updateScoreLimitVentasMutation.mutate({ id: scorelimitventas.id!, data });
      return;
    }

    ///* create
    createScoreLimitVentasMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!scorelimitventas?.id) return;
    reset(scorelimitventas);
  }, [scorelimitventas, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlScoresLimitVentasPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomTextField
        label="Score letter"
        name="score_letter"
        control={form.control}
        defaultValue={form.getValues().score_letter}
        error={errors.score_letter}
        helperText={errors.score_letter?.message}
        size={gridSizeMdLg6}
        disabled={!!scorelimitventas?.id}
      />

      <CustomNumberTextField
        label="Monthly limit"
        name="monthly_limit"
        control={form.control}
        defaultValue={form.getValues().monthly_limit}
        error={errors.monthly_limit}
        helperText={errors.monthly_limit?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <SampleCheckbox
        label="Aplica"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        // size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveScoreLimitVentas;
