import { Button, Grid, IconButton } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import {
  GenericAutocompleteNoFormType,
  gridSize,
  OpcionProductoPromocionItem,
  TIPO_PAGO_PROMOCION_ALQUILER_ARRAY,
  ToastWrapper,
  valueTipoRecuerrenciaAlquilerEnumChoice,
} from '@/shared';
import {
  CustomAutocompleteNoForm,
  CustomTextFieldControlled,
  CustomTypoLabel,
  ScrollableDialogProps,
} from '@/shared/components';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';
import { CustomCardPromocion } from '../../../custom';
import { SelectedEqPromoctionType } from '../SavePromocion';

export type PromocionItemOptionModalProps = {
  open: boolean;
  onClose: () => void;
};

const PromocionItemOptionModal: React.FC<PromocionItemOptionModalProps> = ({
  onClose,
  open,
}) => {
  ///* global state ---------------------
  const { selectedRow, setSelectedRow, updateSelectedItemValue } =
    useTypedGenericInventoryStore<SelectedEqPromoctionType>(
      GenericInventoryStoreKey.equiposPromocion,
    );

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  const handleUpdateOption = (
    index: number,
    field: keyof OpcionProductoPromocionItem,
    value: string | number,
  ) => {
    const updatedOpciones = selectedRow?.productoOptionItemList.map(
      (opcion, i) => (i === index ? { ...opcion, [field]: value } : opcion),
    );

    let newValor = value;
    if (field === 'cuotas') {
      // calc new value = value / cuotas
      const valor = parseFloat(
        selectedRow?.precios?.find(p => p.default)?.valor as any,
      );
      const cuotas = value as number;
      newValor = (valor / cuotas).toFixed(2);

      // update valor
      if (updatedOpciones && cuotas > 0) {
        updatedOpciones[index].valor = newValor;
      }
    }

    setSelectedRow({
      ...selectedRow,
      productoOptionItemList: updatedOpciones || [],
    } as any);
  };

  const handleRemoveOption = (index: number) => {
    const updatedOpciones = selectedRow?.productoOptionItemList.filter(
      (_, i) => i !== index,
    );
    setSelectedRow({
      ...selectedRow,
      productoOptionItemList: updatedOpciones || [],
    } as any);
  };

  const handleAddOption = () => {
    const nuevaOpcion: OpcionProductoPromocionItem = {
      uuid: uuidv4(),
      tipo_pago: valueTipoRecuerrenciaAlquilerEnumChoice.UN_SOLO_PAGO,
      valor:
        (selectedRow?.precios?.find(p => p.default)?.valor as any) || '10.00',
      cantidad: 1,
      cuotas: 1,
    };
    setSelectedRow({
      ...selectedRow,
      productoOptionItemList: [
        ...(selectedRow?.productoOptionItemList || []),
        nuevaOpcion,
      ],
    } as any);
  };

  return (
    <ScrollableDialogProps
      open={open}
      onClose={handleClose}
      minWidth="60%"
      title={`Opciones de producto: ${selectedRow?.nombre || ''}`}
      cancelTextBtn="Cerrar"
      confirmTextBtn="Guardar"
      contentNode={
        <>
          <Grid container spacing={4} mb={3} alignItems="center" p={3}>
            <Grid item xs={12}>
              <CustomTypoLabel text="Opciones a ofertar" />
            </Grid>
            <CustomCardPromocion
              ml={5}
              contentNode={
                <Grid item xs={12}>
                  {selectedRow?.productoOptionItemList.map((opcion, index) => (
                    <Grid
                      key={index}
                      item
                      container
                      spacing={1}
                      alignItems="center"
                    >
                      <Grid item xs={5}>
                        <CustomAutocompleteNoForm<GenericAutocompleteNoFormType>
                          label="Recurrencia"
                          value={opcion.tipo_pago}
                          actualValueKey="value"
                          onChange={v => {
                            handleUpdateOption(index, 'tipo_pago', v as string);
                          }}
                          options={TIPO_PAGO_PROMOCION_ALQUILER_ARRAY}
                          getOptionLabel={o => o.label}
                          loading={false}
                          required
                          error={false}
                          disableClearable
                          size={gridSize}
                        />
                      </Grid>
                      <Grid item xs={2} sx={{ mt: 3 }}>
                        <CustomTextFieldControlled
                          label="Cantidad"
                          value={opcion.cantidad}
                          onChange={e =>
                            handleUpdateOption(
                              index,
                              'cantidad',
                              e.target.value,
                            )
                          }
                          type="number"
                          size={gridSize}
                          min={1}
                        />
                      </Grid>
                      <Grid item xs={2} sx={{ mt: 3 }}>
                        <CustomTextFieldControlled
                          label="Valor base"
                          value={opcion.valor}
                          onChange={e =>
                            handleUpdateOption(index, 'valor', e.target.value)
                          }
                          type="number"
                          size={gridSize}
                          min={1}
                        />
                      </Grid>
                      <Grid item xs={2} sx={{ mt: 3 }}>
                        <CustomTextFieldControlled
                          label="Cuotas"
                          value={opcion.cuotas}
                          onChange={e => {
                            // upd cuota ----------
                            const cuota = e.target.value;
                            handleUpdateOption(index, 'cuotas', cuota);
                          }}
                          type="number"
                          size={gridSize}
                          required={false}
                          min={0}
                        />
                      </Grid>

                      <Grid item xs={1} sx={{ mt: 6 }}>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <MdDelete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}

                  <Grid item xs={12} mt={5}>
                    <Button variant="contained" onClick={handleAddOption}>
                      Agregar Opción
                    </Button>
                  </Grid>
                </Grid>
              }
            />
          </Grid>
        </>
      }
      onConfirm={() => {
        if (selectedRow?.productoOptionItemList.length === 0)
          return ToastWrapper.error('Debe agregar al menos una opción');

        // validate not negative values (cantidad, valor, cuotas)
        const hasNegativeValues = selectedRow?.productoOptionItemList.some(
          opcion =>
            opcion.cantidad < 0 ||
            parseFloat(opcion.valor) < 0 ||
            opcion.cuotas < 0,
        );
        if (hasNegativeValues)
          return ToastWrapper.error(
            'No se permiten valores negativos en cantidad, valor o cuotas',
          );

        updateSelectedItemValue({
          idKey: 'id',
          updatedItem: {
            ...selectedRow,
          } as any,
        });

        handleClose();
      }}
    />
  );
};

export default PromocionItemOptionModal;
