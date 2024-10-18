import { useEffect, useState } from 'react';

import { ScrollableDialogProps } from '@/shared/components';
import { Button, Typography } from '@mui/material';
import { IconServerCog } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { CreateOLTConectParamsBase, useCreateOLTConect } from '@/actions/app';
import { oltConectFormSchema } from '@/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';

export type ViewNotificacionModalProps = {
  nameInfo?: string | undefined;
  listItems: Record<string, any>;

  descriptionInfo: string;
};

type SaveFormData = CreateOLTConectParamsBase & {
  uuid: string;
};

const ViewNotificacionModal: React.FC<ViewNotificacionModalProps> = ({
  nameInfo = '',
  listItems = {},
  descriptionInfo,
}) => {
  ///* global state
  const [open, setOpen] = useState(false);

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(oltConectFormSchema) as any,
    defaultValues: {
      uuid: listItems?.uuid || '', // Toma el UUID de listItems
    },
  });
  const {
    handleSubmit,
    formState: { isValid },
    register,
  } = form;

  ///* mutations
  const createOLTConectMutation = useCreateOLTConect({
    enableErrorNavigate: false,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* create
    createOLTConectMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false); // Cierra el modal al completar el POST exitosamente
      },
    });
  };

  useEffect(() => {
    if (!listItems?.uuid) return;
  }, [listItems]);

  return (
    <>
      <Typography>
        <Button
          component="span"
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => setOpen(!open)}
          style={{ cursor: 'pointer' }}
        >
          <IconServerCog />
        </Button>
      </Typography>

      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          confirmTextBtn="ACEPTO"
          onConfirm={handleSubmit(onSave)} // Ejecuta onSave al confirmar
          confirmVariantBtn="outlined"
          title={nameInfo}
          contentNode={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <iframe
                src="https://lottie.host/embed/c639d2f0-e700-4ac1-bb7b-c64bb5476057/c3vD2TtBSb.json"
                style={{
                  border: 'none',
                  marginBottom: '1cm',
                  width: '100%',
                  maxWidth: '600px',
                }}
              ></iframe>
              <div style={{ marginBottom: '1cm', fontWeight: 'bold' }}>
                NOTIFICACIÓN
              </div>
              <div style={{ marginBottom: '1cm' }}>{descriptionInfo}</div>
              {/* Registro del campo UUID */}
              <input
                type="hidden"
                {...register('uuid')} // Registra el UUID en el formulario
              />
            </div>
          }
        />
      )}
    </>
  );
};

export default ViewNotificacionModal;
