/* eslint-disable indent */
import type { OrdenTrabajo, Preventa } from '@/shared';
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

export const calcImageListOrdenTrabajoFromUrls = (
  ordenTrabajo?: OrdenTrabajo,
): ImageListTitleBarType[] => {
  const fotosUrls = [
    ordenTrabajo?.url_foto_ont,
    ordenTrabajo?.url_foto_potencia_ont,
    ordenTrabajo?.url_foto_ont_encontrado_casa,
    ordenTrabajo?.url_foto_etiqueta,
    ordenTrabajo?.url_foto_nap,
    ordenTrabajo?.url_foto_potencia_nap,
    ordenTrabajo?.url_foto_premio,
    ordenTrabajo?.url_foto_test_speed,
    ordenTrabajo?.url_foto_acta_entrega_ups,
    ordenTrabajo?.url_foto_wifi_mesh,
  ];

  return [
    ...(fotosUrls[0]
      ? [
          {
            title: 'ONT',
            imgUrl: fotosUrls[0],
            id: 0,
          },
        ]
      : []),
    ...(fotosUrls[1]
      ? [
          {
            title: 'Potencia ONT',
            imgUrl: fotosUrls[1],
            id: 1,
          },
        ]
      : []),
    ...(fotosUrls[2]
      ? [
          {
            title: 'ONT encontrado en casa',
            imgUrl: fotosUrls[2],
            id: 2,
          },
        ]
      : []),
    ...(fotosUrls[3]
      ? [
          {
            title: 'Etiqueta',
            imgUrl: fotosUrls[3],
            id: 3,
          },
        ]
      : []),
    ...(fotosUrls[4]
      ? [
          {
            title: 'NAP',
            imgUrl: fotosUrls[4],
            id: 4,
          },
        ]
      : []),
    ...(fotosUrls[5]
      ? [
          {
            title: 'Potencia NAP',
            imgUrl: fotosUrls[5],
            id: 5,
          },
        ]
      : []),
    ...(fotosUrls[6]
      ? [
          {
            title: 'Premio',
            imgUrl: fotosUrls[6],
            id: 6,
          },
        ]
      : []),
    ...(fotosUrls[7]
      ? [
          {
            title: 'Test speed',
            imgUrl: fotosUrls[7],
            id: 7,
          },
        ]
      : []),
    ...(fotosUrls[8]
      ? [
          {
            title: 'Acta entrega UPS',
            imgUrl: fotosUrls[8],
            id: 8,
          },
        ]
      : []),
    ...(fotosUrls[9]
      ? [
          {
            title: 'WiFi Mesh',
            imgUrl: fotosUrls[9],
            id: 9,
          },
        ]
      : []),
  ];
};
