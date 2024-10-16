import { CoordenadasTypeString, Zona } from '@/shared';

export const calcOtherZonesMultiPolygon = (
  zones: Zona[],
  savedCoords: CoordenadasTypeString[] = [],
) => {
  const coordsArray = zones.map(zone => zone.coordenadas);

  const multiPolygon = coordsArray.map(coords => {
    return (coords || [])
      .filter(
        coord =>
          !savedCoords.some(
            savedCoord =>
              savedCoord.lat === coord.lat && savedCoord.lng === coord.lng,
          ),
      )
      .map(coord => {
        return [parseFloat(coord.lat), parseFloat(coord.lng)];
      });
  });

  return multiPolygon?.length ? multiPolygon : [];
};

/*
export const calcOtherZonesMultiPolygon = (
  zones: Zona[],
  savedCoords: CoordenadasTypeString[] = [],
) => {
  // Convertir las coordenadas guardadas a strings para comparación
  const savedCoordsStrings = savedCoords.map(coord =>
    JSON.stringify([coord.lat, coord.lng]),
  );

  const multiPolygon = zones
    .map(zone => {
      const coords = zone.coordenadas;
      // Filtrar si la coordenada completa está en savedCoordsStrings
      const filteredCoords = (coords || []).filter(
        coord =>
          !savedCoordsStrings.includes(JSON.stringify([coord.lat, coord.lng])),
      );

      return filteredCoords.map(coord => [
        parseFloat(coord.lat),
        parseFloat(coord.lng),
      ]);
    })
    .filter(polygon => polygon.length > 0); // Filtrar polígonos vacíos

  return multiPolygon?.length ? multiPolygon : [];
};
*/

/* 
export const calcOtherZonesMultiPolygon = (
  zones: Zona[],
  savedCoords: CoordenadasTypeString[] = [],
) => {
  // Convertir las coordenadas guardadas a un Set de strings para comparación
  const savedCoordsSet = new Set(
    savedCoords.map(coord => JSON.stringify([coord.lat, coord.lng])),
  );

  // Construir el multiPolygon filtrando coordenadas
  const multiPolygon = zones.reduce<number[][][]>((acc, zone) => {
    const filteredCoords = (zone.coordenadas || []).reduce<number[][]>(
      (subAcc, coord) => {
        const coordString = JSON.stringify([coord.lat, coord.lng]);
        if (!savedCoordsSet.has(coordString)) {
          subAcc.push([parseFloat(coord.lat), parseFloat(coord.lng)]);
        }
        return subAcc;
      },
      [],
    );

    if (filteredCoords.length > 0) {
      acc.push(filteredCoords);
    }

    return acc;
  }, []);

  return multiPolygon;
};

*/

export const calcMultiPolygon = (zones: Zona[]) => {
  const coordsArray = zones.map(zone => zone.coordenadas);

  const multiPolygon = coordsArray.map(coords => {
    return (coords || []).map(coord => {
      return [parseFloat(coord.lat), parseFloat(coord.lng)];
    });
  });

  return multiPolygon?.length ? multiPolygon : [];
};
