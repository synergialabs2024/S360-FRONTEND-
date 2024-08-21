import { CoordenadasTypeString, Zona } from '@/shared';

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
