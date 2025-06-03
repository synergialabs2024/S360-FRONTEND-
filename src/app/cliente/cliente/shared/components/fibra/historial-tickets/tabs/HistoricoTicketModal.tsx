import { useForm } from 'react-hook-form';

import {
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  ScrollableDialogProps,
} from '@/shared/components';
import { useInstalacionesStore } from '@/store/app';
import { useRubroStore } from '@/store/app/rubros';
import { Grid } from '@mui/material';
import { useIsMediaQuery } from '@/shared';
import { SingleImageModal } from '@/shared/components/ui';

export type HistoricoTicketModalProps = {
  open: boolean;
  onClose: () => void;
  data: any;
};

export type RubrosClienteFormData = Partial<any> & {
  // helpers to fetch items ------------
  bodega?: number;
  ubicacion?: number;
  categoria_producto?: number;
};

const HistoricoTicketModal: React.FC<HistoricoTicketModalProps> = ({
  open,
  onClose,
  data,
}) => {
  const isMobile = useIsMediaQuery('sm');

  const titleAndImage = (title: string, imgUrl: string) => {
    return (
      <Grid item xs={isMobile ? 1 : 6} sx={isMobile ? { mb: 2 } : {}}>
        <CustomTypoLabel
          text={title}
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <SingleImageModal
          image={{
            id: 1,
            imgUrl: imgUrl || '',
            title: title,
          }}
          widthPercentage="60%"
        />
      </Grid>
    );
  };

  ///* global state --------------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAll);
  const clearAllItemsStore = useInstalacionesStore(s => s.clearAll);

  ///* form --------------------------
  const form = useForm<FormData>({
    defaultValues: {},
  });
  ///* mutations --------------------------

  const handleClose = () => {
    form.reset();
    onClose();
    clearAllRubroStore();
    clearAllItemsStore();
  };

  return (
    <>
      <ScrollableDialogProps
        title={data.id}
        open={open}
        onClose={handleClose}
        minWidth="60%"
        // confirm --------
        /* onConfirm={form.handleSubmit(onSave, errors => {
          const keys = getKeysFormErrorsMessage(errors);
          ToastWrapper.error(`Campos requeridos: ${keys}`);
        })} */
        confirmVariantBtn="outlined"
        confirmTextBtn="Generar Pago"
        // // content --------
        contentNode={
          <>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <CustomTypoLabel
                text="DATOS"
                pt={CustomTypoLabelEnum.ptMiddlePosition}
              />

              <CustomTextFieldNoForm
                label="ASUNTO TICKET"
                value={data?.asunto_del_ticket}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="#TICKET"
                value={data?.id}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="#CONTRATO"
                value={data?.linea_contrato}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="NOMBRE CLIENTE"
                value={data?.nombre_cliente}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="COORDENADAS"
                value={data?.coordenadas}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="CAJA"
                value={data?.caja}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="TELEFONO"
                value={data?.telefono}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="TECNICO RESPONSABLE"
                value={data?.lider_flota}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="FLOTA DE INSTALACION"
                value={data?.flota}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="SERVICIO CONTRATADO"
                value={data?.planNombre}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="VALOR COBRADO"
                value={data?.valor_a_cobrar}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="NUMERO CUOTAS"
                value={data?.numero_cuotas}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="VALOR MENSUAL A PAGAR"
                value={data?.valor_a_pagar_mensual}
                required={false}
                disabled
              />

              <CustomTextFieldNoForm
                label="CONTACTAR CON CLIENTE"
                value={data?.contactar_con_cliente}
                required={false}
                disabled
              />

              <CustomTypoLabel
                text="SOLUCION VISITA"
                pt={CustomTypoLabelEnum.ptMiddlePosition}
              />

              <CustomTextFieldNoForm
                label="SOLUCION VISITA"
                value={data?.asunto_del_ticket}
                required={false}
                disabled
              />

              <CustomTextAreaNoForm
                label="DETALLE DE LA SOLUCION"
                value={data?.observaciones_extra}
                required={false}
                disabled
              />

              {titleAndImage(
                'Foto de la ONU antes de Solución',
                data.foto_antes || '',
              )}

              {titleAndImage(
                'Foto de la ONU despues de la solución',
                data.foto_despues || '',
              )}

              {titleAndImage(
                'Potencia casa del cliente antes de solución',
                data.foto_opcional1 || '',
              )}

              {titleAndImage(
                'Foto de potencia en casa cliente despues de la solución',
                data.foto_potencia || '',
              )}

              {titleAndImage('Foto Test', data.foto_test || '')}

              {titleAndImage('Foto solucion dada', data.foto_solucion || '')}

              {titleAndImage(
                'Foto del daño encontrado',
                data.foto_opcional2 || '',
              )}
            </Grid>
          </>
        }
      />
    </>
  );
};

export default HistoricoTicketModal;
