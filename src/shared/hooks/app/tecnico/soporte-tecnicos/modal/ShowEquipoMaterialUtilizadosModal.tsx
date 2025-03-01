import { IconBrandAsana, IconCheckupList } from '@tabler/icons-react';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';

import { useColumnsEqMaUtilizado } from '../columns';
import { ScrollableDialogProps } from '@/shared/components';
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';

export type ShowEquipoMaterialUtilizadosModalProps = {
  Arrays: any;
  tipo_utilizado: 'equipo' | 'material';
  title?: string;
};

export interface Eq_Ma_Utilizados {
  codigo: string;
  series: string[];
  cantidad: string;
  producto: string[];
}

const ShowEquipoMaterialUtilizadosModal: React.FC<
  ShowEquipoMaterialUtilizadosModalProps
> = ({ Arrays = [], tipo_utilizado, title = 'Productos' }) => {
  //* State local
  const [open, setOpen] = useState(false);

  ///* columns
  const {
    equipoUtilizadoColumns,
    materialUtilizadoColumns,
    generalUtilizadoColumns,
  } = useColumnsEqMaUtilizado();

  const Section = () => (
    <>
      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<Eq_Ma_Utilizados>
            columns={
              tipo_utilizado === 'equipo'
                ? equipoUtilizadoColumns
                : tipo_utilizado === 'material'
                  ? materialUtilizadoColumns
                  : generalUtilizadoColumns
            }
            data={Arrays || []}
            isLoading={false}
            centerColumns={true}
            enableGlobalFilter={true}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <Tooltip
        title={tipo_utilizado === 'equipo' ? 'Equipo' : 'Material'}
        arrow
        placement="top"
      >
        <IconButton
          component="span"
          color="primary"
          size="small"
          onClick={() => setOpen(!open)}
          style={{ cursor: 'pointer' }}
        >
          {tipo_utilizado === 'equipo' ? (
            <IconBrandAsana />
          ) : (
            <IconCheckupList />
          )}
        </IconButton>
      </Tooltip>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          cancelTextBtn="Cerrar"
          title={title}
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default ShowEquipoMaterialUtilizadosModal;
