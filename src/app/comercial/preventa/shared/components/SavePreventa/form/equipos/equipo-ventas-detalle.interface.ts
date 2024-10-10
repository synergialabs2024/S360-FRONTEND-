export interface EquipoVentasDetalle {
  codigo: string;
  cantidad: string;
  series?: SerieVentas[];

  cuotas: number; // depends on the score buro - Bueno max 12, malo max 1
}

export interface SerieVentas {
  code: string;
  block_until: string; // timestamp
}
