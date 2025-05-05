import { CustomTable } from '@/shared/components';
import { Chip, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import HistoricoTicketModal from './HistoricoTicketModal';

export type GenericHistoricoTicketsTabProps = {
  cedula: string;
};

// Interfaz para el tipo de datos de ticket
interface Ticket {
  id: string;
  numero_ticket: number;
  cedula: string;
  numContrato: string;
  nombre_cliente: string;
  direccion: string;
  asunto_del_ticket: string;
  detalles_del_ticket: string;
  estado: number;
  fecha_sugerida_visita: {
    _seconds: number;
    _nanoseconds: number;
  };
  created: {
    _seconds: number;
    _nanoseconds: number;
  };
  usuario_generador_ticket: string;
  // Agrega otros campos que necesites mostrar
}

const GenericHistoricoTicketsTab: React.FC<GenericHistoricoTicketsTabProps> = ({
  cedula,
}) => {
  const estadoStyles = {
    0: { label: 'EN ESPERA', color: 'warning' },
    1: { label: 'GESTIONADO', color: 'success' },
    2: { label: 'CERRADO', color: 'default' },
    3: { label: 'POR REASIGNAR', color: 'error' },
  };

  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketsData, setTicketsData] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Función para formatear fecha de Firestore
  const formatFirestoreDate = (timestamp: {
    _seconds: number;
    _nanoseconds: number;
  }) => {
    return format(new Date(timestamp._seconds * 1000), 'PPPpp', { locale: es });
  };

  // Función para obtener los tickets
  const fetchTicketsByEstado = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://us-central1-sistema-gestion-intercommerce.cloudfunctions.net/api/getTicketsByEstado',
        { cedula: cedula },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.success && response.data.tickets) {
        // Filtrar por cédula si es necesario
        const filteredTickets = response.data.tickets.filter(
          (ticket: Ticket) => ticket.cedula === cedula,
        );
        setTicketsData(filteredTickets);
      }
    } catch (error) {
      console.error('Error al obtener tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Columnas para la tabla de tickets
  const columnsTicketsView = [
    {
      accessorKey: 'numero_ticket',
      header: 'N° Ticket',
      size: 100,
    },
    {
      accessorKey: 'estado',
      header: 'Estado',
      size: 150,
      Cell: ({ cell }: any) => {
        const estado = cell.getValue();
        const estadoInfo = estadoStyles[
          estado as keyof typeof estadoStyles
        ] || { label: 'DESCONOCIDO', color: 'default' };

        return (
          <Chip
            label={estadoInfo.label}
            color={estadoInfo.color as any}
            variant="outlined"
            size="small"
          />
        );
      },
    },
    {
      accessorKey: 'created',
      header: 'Fecha Creación',
      size: 150,
      Cell: ({ cell }: any) => formatFirestoreDate(cell.getValue()),
    },
    {
      accessorKey: 'nombre_cliente',
      header: 'Cliente',
      size: 200,
    },
    {
      accessorKey: 'linea_contrato',
      header: 'Linea Contrato',
      size: 150,
    },
    {
      accessorKey: 'asunto_del_ticket',
      header: 'Asunto',
      size: 150,
    },
    {
      accessorKey: 'direccion',
      header: 'Dirección',
      size: 200,
    },
    {
      accessorKey: 'fecha_sugerida_visita',
      header: 'Fecha Visita',
      size: 150,
      Cell: ({ cell }: any) => formatFirestoreDate(cell.getValue()),
    },
    {
      accessorKey: 'usuario_generador_ticket',
      header: 'Generado por',
      size: 150,
    },
    {
      accessorKey: 'detalles_del_ticket',
      header: 'Detalles',
      size: 300,
    },
  ];

  // Handler para editar/ver ticket
  const onViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchTicketsByEstado();
  }, []);

  return (
    <>
      <Grid item container xs={12}>
        {/* Tabla de Tickets */}
        <Grid item xs={12}>
          <CustomTable
            columns={columnsTicketsView}
            data={ticketsData}
            isLoading={isLoading}
            isRefetching={false}
            enableManualFiltering={false}
            enableGlobalFilter={true}
            enableActionsColumn={true}
            editIconToolTipTitle="Ver detalles"
            canEdit={true}
            onEdit={onViewTicket}
            arrowIcon
            rowCount={ticketsData?.length}
            showCustomButtonsSpaceEnd={true}
          />
        </Grid>

        {/* Modal para ver detalles del ticket */}
        {selectedTicket && (
          <HistoricoTicketModal
            open={open}
            onClose={() => setOpen(false)}
            data={selectedTicket}
          />
        )}
      </Grid>
    </>
  );
};

export default GenericHistoricoTicketsTab;
