import { Preventa } from '@/shared';
import { ImageListTitleBarType } from '@/shared/components/ui';

export const calcImageListPreventaFromUrls = (
  preventa?: Preventa,
): ImageListTitleBarType[] => {
  const fotosUrls = [
    preventa?.url_foto_cedula_frontal,
    preventa?.url_foto_cedula_trasera,
    preventa?.url_foto_vivienda,
    preventa?.url_foto_aceptacion,
    preventa?.url_foto_documento_cuenta,
    preventa?.url_foto_tarjeta,
  ];

  return [
    ...(fotosUrls[0]
      ? [
        {
          title: 'Frontal identificación',
          imgUrl: fotosUrls[0],
          id: 0,
        },
      ]
      : []),
    ...(fotosUrls[1]
      ? [
        {
          title: 'Reverso identificación',
          imgUrl: fotosUrls[1],
          id: 1,
        },
      ]
      : []),
    ...(fotosUrls[2]
      ? [
        {
          title: 'Vivienda',
          imgUrl: fotosUrls[2],
          id: 2,
        },
      ]
      : []),
    ...(fotosUrls[3]
      ? [
        {
          title: 'Aceptación servicio',
          imgUrl: fotosUrls[3],
          id: 3,
        },
      ]
      : []),
    ...(fotosUrls[4]
      ? [
        {
          title: 'Documento cuenta',
          imgUrl: fotosUrls[4],
          id: 4,
        },
      ]
      : []),
    ...(fotosUrls[5]
      ? [
        {
          title: 'Tarjeta',
          imgUrl: fotosUrls[5],
          id: 5,
        },
      ]
      : []),
  ];
};
