export interface EquipoVentasDetalle {
  code: string;
  quiantity: string;
  series: string[];

  cuotas: number; // depends on the score buro - Bueno max 12, malo max 1
}
