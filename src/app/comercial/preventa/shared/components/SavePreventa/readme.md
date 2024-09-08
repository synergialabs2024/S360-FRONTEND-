# Preventa view

- Abre Solicitud Servicio ingresada
- OTP 
  - Countdown que va a Redis
  - Se validan 2 tiempos
  - Solicitud de aprobación OTP a supervisor
    - Refresh cuando apruebe para refrescar la UI y ver estado OTP validado (DB)
      - Pese a existir aún caché porque desde la UI del supervisor no se tiene la key para invalidarla, aquí predomina el estado de DB verificado y ya permite continuar
    - Es flexible dado que si ya tiene el OTP, el vendedor puede verificarlo antes de que lo haga el supervisor porque solo cambia el estado del current OTP, así que ambos pueden verificar el mismo OTP sin entorpecer el proceso
  - Reenviar OTP
    - En el backend expira todos los demás OTPs y solo deja en pendiente este nuevo
      - Actualiza la caché con el nuevo OTP para tener el ID actual y poder solicitar aprobación con este nuevo OTP

- Logic:
  - Las mutaciones W con el `onSuccess` para interactuar con la cache
    - Los tiemers vienen de un enum `TimerSolicitudServicioEnum`
  - El `safeResetForm` permite actualizar la data sin perder el formulario anterior
    - No se invalida la query xq ese invalidate no retorna response, asi q se trabajo con axios directamente y no con el useQuery en este caso.
