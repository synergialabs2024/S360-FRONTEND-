import { useEffect, useState } from 'react';

import { ScrollableDialogProps } from '@/shared/components';
import { Button, TextField, Typography } from '@mui/material';
import { IconServer2, IconServerCog } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { CreateOLTParamsBase } from '@/actions/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { oLTFormSchema } from '@/shared';

export type ViewConfiguracionModalProps = {
  nameInfo?: string | undefined;
  listItems: Record<string, any>;
};

type SaveFormData = CreateOLTParamsBase & {};

const ViewConfiguracionModal: React.FC<ViewConfiguracionModalProps> = ({
  nameInfo = 'Configuración de la OLT',
  listItems = {},
}) => {
  ///* global state
  const [open, setOpen] = useState(false);

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(oLTFormSchema) as any,
  });

  const {
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!listItems?.id) return;
    reset(listItems);
  }, [listItems]);

  return (
    <>
      <Typography>
        <Button
          component="span"
          color="success"
          variant="outlined"
          size="small"
          onClick={() => setOpen(!open)}
          style={{ cursor: 'pointer' }}
        >
          <IconServer2 />
        </Button>
      </Typography>

      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          confirmVariantBtn="outlined"
          title={nameInfo}
          contentNode={<>hola</>}
        />
      )}
    </>
  );
};

export default ViewConfiguracionModal;
