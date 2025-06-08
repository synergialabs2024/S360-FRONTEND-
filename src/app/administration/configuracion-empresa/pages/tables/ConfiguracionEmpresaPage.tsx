import { Box, Grid, Stack, Tab } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import ImageSwitch from '@/components/shared/ImageSwitch';
import { useFetchConfiguracionEmpresas } from '@/actions/app';
import {
  ConfiguracionEmpresa,
  gridSizeMdLg12,
  gridSizeMdLg6,
  useIsMediaQuery,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomSingleButton,
  CustomTabPanel,
  CustomTextFieldNoForm,
  FormTabsOnly,
  NestedTabsScene,
  SingleTableBoxScene,
} from '@/shared/components';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router';

export const returnUrlConfiguracionsEmpresaPage =
  ROUTER_PATHS.administracion.configuracionEmpresaNav;

export type ConfiguracionsEmpresaPageProps = {} & ConfiguracionEmpresa;

const ConfiguracionsEmpresaPage: React.FC<
  ConfiguracionsEmpresaPageProps
> = () => {
  const isMobile = useIsMediaQuery('sm');

  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  const { data: EmpresaPagingRes } = useFetchConfiguracionEmpresas({
    enabled: true,
  });

  const navigate = useNavigate();

  return (
    <>
      <SingleTableBoxScene
        title="Configuración de mi Empresa"
        showCreateBtn={false}
      >
        <Grid
          container
          sx={{
            p: '30px 25px 20px',
          }}
        >
          <Grid item sm={4}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%', // Muy importante para que se pueda alinear verticalmente
              }}
            >
              <ImageSwitch
                primaryImageUrl={EmpresaPagingRes?.data.logo_1_url!}
                secondaryImageUrl={EmpresaPagingRes?.data.logo_2_url!}
                size={250}
                smallSize={70}
              />
            </div>
          </Grid>

          <Grid item sm={8}>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                pt: isMobile ? 1 : 2,
                borderRadius: '12px',
              }}
            >
              <Stack spacing={2}>
                <Grid container>
                  <Grid
                    item
                    container
                    spacing={3}
                    justifyContent="center"
                    sx={{ mb: 3 }}
                  >
                    <NestedTabsScene
                      tabs={
                        <FormTabsOnly
                          value={tabValue}
                          onChange={handleTabChange}
                        >
                          <Tab
                            label="Información"
                            value={1}
                            {...a11yProps(1)}
                          />
                          <Tab label="Mas" value={2} {...a11yProps(2)} />
                        </FormTabsOnly>
                      }
                      sxContainer={{
                        pt: 0,
                        pb: 0,
                        m: 0,
                      }}
                    >
                      {/* ========================= Parte 1 ========================= */}

                      <CustomTabPanel index={1} value={tabValue}>
                        <CustomTextFieldNoForm
                          label="Razón social"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.company_name}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Nombre Comercial"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.commercial_name}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Nombre del esquema"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.schema_name}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Email"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.email}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Teléfono celular"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.mobile}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Teléfono convencional"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.phone}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Dirección del Establecimiento Matriz"
                          size={gridSizeMdLg12}
                          value={EmpresaPagingRes?.data?.main_address}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Descripción"
                          size={gridSizeMdLg12}
                          value={EmpresaPagingRes?.data?.description}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Parroquia"
                          size={gridSizeMdLg6}
                          value={
                            EmpresaPagingRes?.data?.parroquia_name_contrato
                          }
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Provincia"
                          size={gridSizeMdLg6}
                          value={
                            EmpresaPagingRes?.data?.provincia_name_contrato
                          }
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Ciudad"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.ciudad_name_contrato}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Cantón"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.canton_name_contrato}
                          required={false}
                          disabled
                        />
                      </CustomTabPanel>

                      {/* ========================= Parte 2 ========================= */}
                      <CustomTabPanel index={2} value={tabValue}>
                        <CustomTextFieldNoForm
                          label="Dirección de página web"
                          size={gridSizeMdLg12}
                          value={EmpresaPagingRes?.data?.website}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="URL de imagen del email para aceptar contrato"
                          size={gridSizeMdLg12}
                          value={
                            EmpresaPagingRes?.data
                              ?.url_imagen_email_aceptar_contrato
                          }
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Url oficina virtual activación"
                          size={gridSizeMdLg12}
                          value={
                            EmpresaPagingRes?.data
                              ?.url_oficina_virtual_activacion
                          }
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Oficina virtual aceptacion"
                          size={gridSizeMdLg12}
                          value={
                            EmpresaPagingRes?.data
                              ?.url_oficina_virtual_aceptacion
                          }
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Dirección del Establecimiento Emisor"
                          size={gridSizeMdLg12}
                          value={EmpresaPagingRes?.data?.establishment_address}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Obligado a Llevar Contabilidad"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.obligated_accounting}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Código del Punto de Emisión"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.issuing_point_code}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Código del Establecimiento Emisor"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.establishment_code}
                          required={false}
                          disabled
                        />
                        <CustomTextFieldNoForm
                          label="Contribuyente Especial"
                          size={gridSizeMdLg6}
                          value={EmpresaPagingRes?.data?.special_taxpayer}
                          required={false}
                          disabled
                        />
                      </CustomTabPanel>
                    </NestedTabsScene>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Grid>
          <CustomSingleButton
            sxBtn={{ mt: 5 }}
            label="Actualizar"
            color="primary"
            variant="text"
            startIcon={<FiPlus />}
            onClick={() =>
              navigate(`${returnUrlConfiguracionsEmpresaPage}/editar`)
            }
            justifyContent="flex-end"
          />
        </Grid>
      </SingleTableBoxScene>
    </>
  );
};

export default ConfiguracionsEmpresaPage;
