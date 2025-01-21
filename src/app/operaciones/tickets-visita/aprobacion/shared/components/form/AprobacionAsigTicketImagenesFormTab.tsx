import { useIsMediaQuery } from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import { SingleImageModal } from '@/shared/components/ui';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { Grid } from '@mui/material';
export type AprobacionAsigTicketImagenesFormTabProps = {
  ticket: Ticket;
};
const AprobacionAsigTicketImagenesFormTab: React.FC<
  AprobacionAsigTicketImagenesFormTabProps
> = ({ ticket }) => {
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

  return (
    <>
      <>
        <CustomTypoLabel
          text="Imagenes"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        {ticket && (
          <>
            {titleAndImage(
              'Foto Antes Solucion',
              ticket.url_foto_antes_solucion || '',
            )}
            {titleAndImage(
              'Foto Despues Solucion',
              ticket.url_foto_despues_solucion || '',
            )}
            {titleAndImage(
              'Foto Test Velocidad',
              ticket.url_foto_test_velocidad || '',
            )}
            {titleAndImage(
              'Foto Potencia Antes Solucion',
              ticket.url_foto_potencia_antes_solucion || '',
            )}
            {titleAndImage(
              'Foto Potencia Despues Solucion',
              ticket.url_foto_potencia_despues_solucion || '',
            )}
            {titleAndImage(
              'Foto Problema Encontrad',
              ticket.url_foto_problema_encontrado || '',
            )}
            {titleAndImage('Foto Solucion', ticket.url_foto_solucion || '')}
            {titleAndImage(
              'Foto Entrega Mesh',
              ticket.url_foto_entrega_mesh || '',
            )}
            {titleAndImage(
              'Foto Entrega Ups',
              ticket.url_foto_entrega_ups || '',
            )}
          </>
        )}
      </>
    </>
  );
};

export default AprobacionAsigTicketImagenesFormTab;
