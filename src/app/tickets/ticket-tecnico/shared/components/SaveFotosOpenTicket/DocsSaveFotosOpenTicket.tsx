import { useIsMediaQuery } from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import type { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';
import { Grid } from '@mui/material';

export type DocsSaveFotosOpenTicketProps = {
  viviendaImg: File | null;
  setViviendaImg: any;
  viviendaImgLabel: JSX.Element;

  opcionalImg: File | null;
  setOpcionalImg: any;
  opcionalImgLabel: JSX.Element;

  UploadImageDropZoneComponent: React.FC<UploadImagePreviewBtnProps>;
};

const DocsSaveFotosOpenTicket: React.FC<DocsSaveFotosOpenTicketProps> = ({
  viviendaImg,
  setViviendaImg,
  viviendaImgLabel,

  opcionalImg,
  setOpcionalImg,
  opcionalImgLabel,

  UploadImageDropZoneComponent,
}) => {
  const isMobile = useIsMediaQuery('sm');
  return (
    <>
      <CustomTypoLabel
        text="Documentos Adjuntos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
        color={'#505050'}
      />

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {viviendaImg != null ? <></> : viviendaImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto vivienda"
          selectedImage={viviendaImg}
          setSelectedImage={setViviendaImg}
        />
      </Grid>

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {opcionalImg != null ? <></> : opcionalImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto Opcional"
          selectedImage={opcionalImg}
          setSelectedImage={setOpcionalImg}
        />
      </Grid>
    </>
  );
};

export default DocsSaveFotosOpenTicket;
