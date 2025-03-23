/* eslint-disable indent */
import { Grid, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import type { EquiposSeleccionadosTableType } from '@/app/comercial/preventa/shared/components/SavePreventa/form/equipos/EquiposSeleccionadosPreventa';
import { useColumnsEquiposPreventa } from '@/app/comercial/preventa/shared/hooks';
import {
  CodigoProductosEnumChoice,
  gridSize,
  type OrdenTrabajo,
} from '@/shared';
import {
  CustomCardAlert,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTypoLabel,
  ScrollableDialogProps,
} from '@/shared/components';
import { ItemsPromoInstalacion, useInstalacionesStore } from '@/store/app';

export type EquipoAdicionalInstallTectAsignFormPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

const EquipoAdicionalInstallTectAsignFormPart: React.FC<
  EquipoAdicionalInstallTectAsignFormPartProps
> = ({ ordenTrabajo }) => {
  ///* local state --------------------
  const [openModal, setOpenModal] = useState<boolean>(false);

  ///* global state --------------------
  const setIsRequiredMiniUPS = useInstalacionesStore(
    s => s.setIsRequiredMiniUPS,
  );
  const setIsRequiredMesh = useInstalacionesStore(s => s.setIsRequiredMesh);
  const setSelectedPromocion = useInstalacionesStore(
    s => s.setSelectedPromocion,
  );
  const setPromocionItemsSelected = useInstalacionesStore(
    s => s.setPromocionItemsSelected,
  );
  const setPromocionPremioSelectedUuid = useInstalacionesStore(
    s => s.setPromocionPremioSelectedUuid,
  );
  const selectedPromo = useInstalacionesStore(s => s.selectedPromocion);
  const promocionItemsSelected = useInstalacionesStore(
    s => s.promocionItemsSelected,
  );
  const promocionPremioSelectedUuid = useInstalacionesStore(
    s => s.promocionPremioSelectedUuid,
  );
  const setPromocionPremioSelectedFormatted = useInstalacionesStore(
    s => s.setPromocionPremioSelectedFormatted,
  );
  const setPromocionItemsSelectedFormatted = useInstalacionesStore(
    s => s.setPromocionItemsSelectedFormatted,
  );
  const promocionItemsSelectedFormatted = useInstalacionesStore(
    s => s.promocionItemsSelectedFormatted,
  );
  const promocionPremioSelectedFormatted = useInstalacionesStore(
    s => s.promocionPremioSelectedFormatted,
  );

  ///* columns ---------------------
  const { savedEquiposPreventaColumns } = useColumnsEquiposPreventa({
    showActionColumn: false,
  });

  const equiposVentaDetail = useMemo(() => {
    return ordenTrabajo?.preventa_data?.equipos_venta_detalle || [];
  }, [ordenTrabajo?.preventa_data?.equipos_venta_detalle]);

  ///* effects --------------------
  useEffect(() => {
    // if (!equiposVentaDetail.length) return;

    const isRequiredMiniUPS = equiposVentaDetail?.some(
      item => item.codigo === CodigoProductosEnumChoice.MINI_UPS,
    );
    setIsRequiredMiniUPS(isRequiredMiniUPS);

    const isRequiredMesh = equiposVentaDetail?.some(
      item => item.codigo === CodigoProductosEnumChoice.WIFIMESH,
    );
    setIsRequiredMesh(isRequiredMesh);

    // handle promocion -------------
    const selectedPromocion =
      ordenTrabajo?.preventa_data?.promociones_data?.at(0) || null;
    if (!selectedPromocion) return;
    setSelectedPromocion(selectedPromocion as any);
    setPromocionItemsSelected(
      ordenTrabajo?.preventa_data?.promocion_items_selected || [],
    );
    setPromocionPremioSelectedUuid(
      ordenTrabajo?.preventa_data?.promocion_premio_selected || null,
    );

    const selectedItemsFormatted =
      promocionItemsSelected.map(item => {
        const itemFound = selectedPromo?.opciones_productos_incluye?.find(
          i => i.codigo === item.codigo,
        );
        const cantidad = itemFound?.opciones?.find(
          i => i.uuid === item.selected_item_uuid,
        )?.cantidad;

        return {
          ...item,
          cantidad,
        };
      }) || [];
    setPromocionItemsSelectedFormatted(
      selectedItemsFormatted as ItemsPromoInstalacion[],
    );
    const selectedPremioFormatted = promocionPremioSelectedUuid
      ? [
          {
            ...selectedPromo?.opciones_productos_premio?.find(
              i => i?.uuid === promocionPremioSelectedUuid,
            ),
            cantidad: 1,
          },
        ]
      : [];

    setPromocionPremioSelectedFormatted(
      selectedPremioFormatted as ItemsPromoInstalacion[],
    );
  }, [
    equiposVentaDetail,
    setIsRequiredMesh,
    setIsRequiredMiniUPS,
    ordenTrabajo,
    setSelectedPromocion,
    setPromocionItemsSelected,
    setPromocionPremioSelectedUuid,
    promocionItemsSelected,
    setPromocionItemsSelectedFormatted,
    setPromocionPremioSelectedFormatted,
    selectedPromo,
    promocionPremioSelectedUuid,
  ]);

  if (
    !equiposVentaDetail.length &&
    !promocionItemsSelected.length &&
    !promocionPremioSelectedUuid
  )
    return null;

  return (
    <Grid item container mb={4}>
      <CustomCardAlert
        sizeType="small"
        alertSeverity="info"
        alertTitle="Equipo adicional"
        alertContentNode={
          <Grid item container {...gridSize} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              La instalación requiere de equipo adicional{' '}
            </Typography>

            <CustomSingleButton
              label="Ver detalle"
              noGrid
              variant="text"
              color="primary"
              onClick={() => {
                setOpenModal(true);
              }}
              sxBtn={{ ml: 2 }}
            />
          </Grid>
        }
      />

      {/* ============== modals ============== */}
      <ScrollableDialogProps
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Equipo adicional requerido"
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid item container {...gridSize} spacing={2}>
            <Grid item xs={12}>
              <CustomTypoLabel text="Equipo adicional" />
              <>
                {equiposVentaDetail.length > 0 ? (
                  <CustomMinimalTable<EquiposSeleccionadosTableType>
                    columns={savedEquiposPreventaColumns}
                    data={(equiposVentaDetail as any) || []}
                    enablePagination
                    density="comfortable"
                  />
                ) : (
                  <Grid item xs={12} sx={{ width: '90%', margin: 'auto' }}>
                    <CustomCardAlert
                      sizeType="small"
                      alertSeverity="info"
                      alertTitle="No hay equipo adicional"
                      alertMessage="No se ha seleccionado equipo para la venta adicional"
                    />
                  </Grid>
                )}
              </>
            </Grid>

            <Grid item xs={12}>
              <>
                <CustomTypoLabel text="Items por promoción" />
                {useInstalacionesStore.getState().promocionItemsSelected
                  ?.length > 0 ? (
                  <>
                    <CustomMinimalTable<EquiposSeleccionadosTableType>
                      columns={savedEquiposPreventaColumns}
                      data={promocionItemsSelectedFormatted}
                      enablePagination
                      density="comfortable"
                    />
                  </>
                ) : (
                  <Grid item xs={12} sx={{ width: '90%', margin: 'auto' }}>
                    <CustomCardAlert
                      sizeType="small"
                      alertSeverity="info"
                      alertTitle="No hay items seleccionados"
                      alertMessage="No se han seleccionado items de la promoción"
                    />
                  </Grid>
                )}
              </>
            </Grid>

            <Grid item xs={12}>
              <CustomTypoLabel text="Premio por promoción" />
              {promocionPremioSelectedUuid ? (
                <>
                  <CustomMinimalTable<EquiposSeleccionadosTableType>
                    columns={savedEquiposPreventaColumns}
                    data={promocionPremioSelectedFormatted}
                    enablePagination
                    density="comfortable"
                  />
                </>
              ) : (
                <Grid item xs={12} sx={{ width: '90%', margin: 'auto' }}>
                  <CustomCardAlert
                    sizeType="small"
                    alertSeverity="info"
                    alertTitle="No hay premio seleccionado"
                    alertMessage="No se ha seleccionado un premio de la promoción"
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        }
      />
    </Grid>
  );
};

export default EquipoAdicionalInstallTectAsignFormPart;
