import { IconTicket } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { ScrollableDialogProps, SimpleTable } from '@/shared/components';
import { format } from 'date-fns';
import axios from 'axios';
import { es } from 'date-fns/locale';
import HistoricoTicketModal from '@/app/cliente/cliente/shared/components/fibra/historial-tickets/tabs/HistoricoTicketModal';

export type ShowPingModalProps = {
  modalTitle?: string;
  cedula: string;
  typeBtn: 'button' | 'icon';
};

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

const HistorialTickets: React.FC<ShowPingModalProps> = ({
  modalTitle = 'HISTORIAL TICKETS',
  cedula,
}) => {
  const estadoStyles = {
    0: { label: 'EN ESPERA', color: 'warning' },
    1: { label: 'GESTIONADO', color: 'success' },
    2: { label: 'CERRADO', color: 'default' },
    3: { label: 'POR REASIGNAR', color: 'error' },
  };

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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
          (ticket: Ticket) => ticket?.cedula === cedula,
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
    setOpenModal(true);
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchTicketsByEstado();
  }, []);

  return (
    <>
      <Typography>
        <Tooltip title={'HISTORIAL TICKETS'} arrow placement="top">
          <IconButton
            component="span"
            color="primary"
            size="small"
            onClick={() => {
              setOpen(!open);
            }}
            style={{ cursor: 'pointer' }}
          >
            <IconTicket />
          </IconButton>
        </Tooltip>
      </Typography>

      {open && (
        <ScrollableDialogProps
          open={open}
          minWidth="60%"
          onClose={() => {
            setOpen(false);
          }}
          title={modalTitle}
          contentNode={
            <>
              <SimpleTable
                columns={columnsTicketsView}
                data={ticketsData || []}
                isLoading={isLoading}
                enableGlobalFilter={true}
                enableActionsColumn={true}
                editIconToolTipTitle="Ver detalles"
                canEdit={true}
                onEdit={onViewTicket}
                arrowIcon
                showCustomButtonsSpaceEnd={true}
              />
              {/* Modal para ver detalles del ticket */}
              {selectedTicket && (
                <HistoricoTicketModal
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  data={selectedTicket}
                />
              )}
            </>
          }
        />
      )}
    </>
  );
};

export default HistorialTickets;
