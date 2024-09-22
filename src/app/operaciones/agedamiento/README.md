
- --- `usePlanificadorAgendamiento`
  - -- Usa preventa de zustand q es populado en el SaveAgenda component, en el useEffect del form.reset() del `SaveAgendamiento`

  - -- Lo uso para el 1er fetch de los planificadores y setear el `availableTimeMap` q es el disponible en base a los SystemParams o las horas de instalacion disponibles de la flota seleccionada
    - En el `receive_fleet_schedule` escucho el nuevo timeMap q serian los `OCUPADOS` q debo filtrar del `availableTimeMap` del frontend

