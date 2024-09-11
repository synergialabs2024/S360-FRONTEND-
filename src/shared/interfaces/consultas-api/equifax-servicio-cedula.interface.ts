export interface EquifaxServicioCedula {
  identificacion: string;
  tipo_identificacion: string;
  plan_sugerido: PlanSugerido[];
  score_sobreendeudamiento: ScoreServicios;
  score_servicios: ScoreServicios;
  resultado_politicas: ScoreServicios[];
}

export interface PlanSugerido {
  scoreServicios: string;
  rangoCapacidadDePago: string;
  planSugerido: string;
  _id: string;
}

export interface ScoreServicios {
  politica: string;
  valor: string;
  decision: string;
  _id: string;
}
