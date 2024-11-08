import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { gridSizeMdLg4, oLTFormSchema, SAVE_OLT_PERMISSIONS } from '@/shared';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { OLT } from '@/shared/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateOLTParamsBase } from '@/actions/app';
import { returnUrlOLTsPage } from '../../../pages/tables/OLTsPage';
import { CustomTextView, SingleFormBoxSceneOLT } from '../../../pages/custom';
import OLTScence from './OLTScence';

export interface ConfigOLTProps {
  title: string;
  olt?: OLT;
}

type SaveFormData = CreateOLTParamsBase & {};

const ConfigOLT: React.FC<ConfigOLTProps> = ({ title, olt }) => {
  useCheckPermissionsArray(SAVE_OLT_PERMISSIONS);

  ///* hooks
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(oLTFormSchema) as any,
  });

  const { reset } = form;

  useEffect(() => {
    if (!olt?.id) return;
    reset(olt);
  }, [olt, reset]);

  return (
    <SingleFormBoxSceneOLT
      onCancel={() => navigate(returnUrlOLTsPage)}
      titlePage={title}
      listItems={olt}
    >
      <CustomTextView
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        size={gridSizeMdLg4}
        disabled
      />
      <CustomTextView
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        size={gridSizeMdLg4}
        disabled
      />
      <CustomTextView
        name="location"
        control={form.control}
        defaultValue={form.getValues().location}
        size={gridSizeMdLg4}
        disabled
      />
      <CustomTextView
        name="hostname"
        control={form.control}
        defaultValue={form.getValues().hostname}
        size={gridSizeMdLg4}
        disabled
      />
      <CustomTextView
        name="puerto"
        control={form.control}
        defaultValue={form.getValues().puerto}
        size={gridSizeMdLg4}
        disabled
      />
      <CustomTextView
        name="snmp_community"
        control={form.control}
        defaultValue={form.getValues().snmp_community}
        size={gridSizeMdLg4}
        disabled
      />
      {/* ---------- FK ---------- */}
      <OLTScence data={olt} />
    </SingleFormBoxSceneOLT>
  );
};

export default ConfigOLT;
