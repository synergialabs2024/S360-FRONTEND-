import { CoordenadasTypeString, Zona } from '@/shared';

export const calcOtherZonesMultiPolygon = (
  zones: Zona[],
  savedCoords: CoordenadasTypeString[][] = [],
) => {
  return zones
    .filter(zone => zone.coordenadas?.length)
    .map(zone => {
      // Convertir coordenadas de la zona actual a formato numérico
      const currentZoneCoords = zone?.coordenadas?.map(polygon =>
        polygon.map(coord => ({
          lat: parseFloat(coord.lat),
          lng: parseFloat(coord.lng),
        })),
      );

      // Filtrar polígonos que no están en los guardados
      return currentZoneCoords?.filter(
        polygon =>
          !savedCoords.some(
            savedPolygon =>
              // Comparar si el polígono actual existe en los guardados
              JSON.stringify(savedPolygon.map(c => [c.lat, c.lng])) ===
              JSON.stringify(
                polygon.map(c => [c.lat.toString(), c.lng.toString()]),
              ),
          ),
      );
    })
    .flat() // Aplanar el array de arrays
    .filter(polygon => polygon && polygon.length > 0); // Filtrar polígonos vacíos
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
  const multiPolygon = zones
    .map(zone =>
      (zone.coordenadas || []).map(
        (
          polygon, // Cada polígono en el multipolígono
        ) =>
          polygon.map(coord => [parseFloat(coord.lat), parseFloat(coord.lng)]),
      ),
    )
    .flat(); // Aplanar todos los polígonos de todas las zonas

  return multiPolygon.length ? multiPolygon : [];
};
