import { Grid, IconButton, Tab, Tooltip } from '@mui/material';
import { IconHistory } from '@tabler/icons-react';
import { useState } from 'react';

import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  NestedTabsScene,
  ScrollableDialogProps,
  SimpleTable,
} from '@/shared/components';
import { useTabsOnly } from '@/shared/hooks/ui';
import { getTicketsCRMHistorial } from '@/actions/app';
import {
  CRM_cambio_domicilio,
  CRM_cambio_plan,
  CRM_contratar,
  CRM_migracion,
  CRM_soporte_tecnico,
  CRM_suspension,
  SoporteTecnicoHistorialYigasuite,
} from '@/shared/interfaces';
import { useColumnsHistoryYS } from '../columns/useColumnsHistoryYS';

export type ShowHistorialTicketsYSModalProps = {
  cedula: string;
  title?: string;
};

const ShowHistorialTicketsYSModal: React.FC<
  ShowHistorialTicketsYSModalProps
> = ({ cedula, title = 'HISTORICO TICKETS YIGASUITE' }) => {
  //* State local
  const [open, setOpen] = useState(false);
  const [historyYS, setHistoryYS] =
    useState<SoporteTecnicoHistorialYigasuite>();

  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* columns
  const {
    soportetecnicoYSColumns,
    cambioDomicilioYSColumns,
    cambioPlanYSColumns,
    contratarYSColumns,
    migracionYSColumns,
    suspensionYSColumns,
  } = useColumnsHistoryYS();

  const Section = () => (
    <NestedTabsScene
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="CRM SOPORTE TECNICO" value={1} {...a11yProps(1)} />
          <Tab label="CRM CAMBIO PLAN" value={2} {...a11yProps(2)} />
          <Tab label="CRM CAMBIO DOMICILIO" value={3} {...a11yProps(3)} />
          <Tab label="CRM CONTRATAR" value={4} {...a11yProps(4)} />
          <Tab label="CRM MIGRACION" value={5} {...a11yProps(5)} />
          <Tab label="CRM SUSPENSION" value={6} {...a11yProps(6)} />
        </FormTabsOnly>
      }
    >
      {/* ========================= CRM SOPORTE TECNICO ========================= */}
      <CustomTabPanel index={1} value={tabValue}>
        <Grid item xs={12}>
          <SimpleTable<CRM_soporte_tecnico>
            columns={soportetecnicoYSColumns}
            data={historyYS?.CRM_soporte_tecnico || []}
            isLoading={false}
            centerColumns={true}
            enableGlobalFilter={true}
          />
        </Grid>
      </CustomTabPanel>

      {/* ========================= CRM CAMBIO PLAN ========================= */}
      <CustomTabPanel index={2} value={tabValue}>
        <Grid item xs={12}>
          <SimpleTable<CRM_cambio_plan>
            columns={cambioPlanYSColumns}
            data={historyYS?.CRM_cambio_plan || []}
            isLoading={false}
            centerColumns={true}
            enableGlobalFilter={true}
          />
        </Grid>
      </CustomTabPanel>

      {/* ========================= CRM CAMBIO DOMICILIO ========================= */}
      <CustomTabPanel index={3} value={tabValue}>
        <Grid item xs={12}>
          <SimpleTable<CRM_cambio_domicilio>
            columns={cambioDomicilioYSColumns}
            data={historyYS?.CRM_cambio_domicilio || []}
            isLoading={false}
            centerColumns={true}
            enableGlobalFilter={true}
          />
        </Grid>
      </CustomTabPanel>

      {/* ========================= CRM CONTRATAR ========================= */}
      <CustomTabPanel index={4} value={tabValue}>
        <Grid item xs={12}>
          <SimpleTable<CRM_contratar>
            columns={contratarYSColumns}
            data={historyYS?.CRM_contratar || []}
            isLoading={false}
            centerColumns={true}
            enableGlobalFilter={true}
          />
        </Grid>
      </CustomTabPanel>

      {/* ========================= CRM MIGRACION ========================= */}
      <CustomTabPanel index={5} value={tabValue}>
        <Grid item xs={12}>
          <SimpleTable<CRM_migracion>
            columns={migracionYSColumns}
            data={historyYS?.CRM_migracion || []}
            isLoading={false}
            centerColumns={true}
            enableGlobalFilter={true}
          />
        </Grid>
      </CustomTabPanel>

      {/* ========================= CRM SUSPENSION ========================= */}
      <CustomTabPanel index={6} value={tabValue}>
        <Grid item xs={12}>
          <SimpleTable<CRM_suspension>
            columns={suspensionYSColumns}
            data={historyYS?.CRM_suspension || []}
            isLoading={false}
            centerColumns={true}
            enableGlobalFilter={true}
          />
        </Grid>
      </CustomTabPanel>
    </NestedTabsScene>
  );

  return (
    <>
      <Tooltip title={title} arrow placement="top">
        <IconButton
          component="span"
          color="primary"
          size="small"
          onClick={() => {
            setOpen(!open);
            getTicketsCRMHistorial(cedula)
              .then(data => {
                setHistoryYS(data);
              })
              .catch(error => {
                console.error('Error al obtener historial:', error);
              });
          }}
          style={{ cursor: 'pointer' }}
        >
          <IconHistory />
        </IconButton>
      </Tooltip>
      {open && (
        <ScrollableDialogProps
          open={open}
          minWidth="30cm"
          onClose={() => setOpen(false)}
          cancelTextBtn="Cerrar"
          title={title}
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default ShowHistorialTicketsYSModal;
