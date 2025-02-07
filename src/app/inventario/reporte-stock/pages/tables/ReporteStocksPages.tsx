import * as XLSX from 'xlsx';
import { Button, Grid } from '@mui/material';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

import {
  useTableFilter,
  PermissionsEnum,
  UbicacionProducto,
  useColumnsReporteStock,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchUbicacionProductos } from '@/actions/app';

export const returnUrlReporteStockPages =
  ROUTER_PATHS.inventario.reporteStocksNav;

const MotivoReporteStockPages: React.FC = () => {
  useCheckPermission(PermissionsEnum.inventario_view_ubicacionproducto);

  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  const {
    data: reporteStockPagingRes,
    isLoading,
    isRefetching,
  } = useFetchUbicacionProductos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      producto__nombre: searchTerm,
      ...filterObject,
    },
  });

  const handleDownloadExcel = () => {
    const items = reporteStockPagingRes?.data?.items || [];

    const data = items.map(item => ({
      ID: item.id,
      Producto: item.producto_data?.nombre,
      Bodega: item.bodega_data?.nombre,
      Ubicación: item.ubicacion_data?.nombre,
      'Stock Actual': item.stock_actual,
      'Stock Mínimo': item.stock_minimo,
      'Stock Máximo': item.stock_maximo,
      'Stock Crítico': item.stock_critico,
      Series: item.series ? item.series.join(', ') : '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte Stock');
    XLSX.writeFile(workbook, 'Reporte_Stock.xlsx');
  };

  const handleDownloadPDF = async () => {
    const items = reporteStockPagingRes?.data?.items || [];

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 10;
    const margin = 40;
    const columnWidth = (595 - 2 * margin) / 8;
    const lineHeight = fontSize + 8;

    let page = pdfDoc.addPage([595, 842]);
    const { height } = page.getSize();
    let yPosition = height - margin;

    const calculateRowHeight = (text: string, maxWidth: number) => {
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      return Math.ceil(textWidth / maxWidth) * lineHeight;
    };

    const drawCell = (
      text: string,
      x: number,
      y: number,
      width: number,
      rowHeight: number,
    ) => {
      page.drawRectangle({
        x,
        y: y - rowHeight + 5,
        width,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      const words = text.split(' ');
      let line = '';
      let textY = y - fontSize - 5;

      words.forEach(word => {
        const testLine = line + word + ' ';
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth > width - 10) {
          page.drawText(line.trim(), {
            x: x + 5,
            y: textY,
            size: fontSize,
            font,
          });
          line = word + ' ';
          textY -= lineHeight;
        } else {
          line = testLine;
        }
      });

      if (line) {
        page.drawText(line.trim(), {
          x: x + 5,
          y: textY,
          size: fontSize,
          font,
        });
      }
    };

    const headers = [
      'Producto',
      'Bodega',
      'Ubicación',
      'Stock Actual',
      'Stock Mínimo',
      'Stock Máximo',
      'Stock Crítico',
      'Series',
    ];

    // eslint-disable-next-line prefer-const
    let headerHeights = headers.map(header =>
      calculateRowHeight(header, columnWidth - 10),
    );
    // eslint-disable-next-line prefer-const
    let maxHeaderHeight = Math.max(...headerHeights) + 28; // Aumenta en 1 cm

    if (yPosition - maxHeaderHeight < margin) {
      page = pdfDoc.addPage([595, 842]);
      yPosition = height - margin;
    }

    headers.forEach((header, index) => {
      drawCell(
        header,
        margin + index * columnWidth,
        yPosition,
        columnWidth,
        maxHeaderHeight,
      );
    });

    yPosition -= maxHeaderHeight;

    items.forEach(item => {
      const row = [
        item.producto_data?.nombre || '',
        item.bodega_data?.nombre || '',
        item.ubicacion_data?.nombre || '',
        item.stock_actual?.toString() || '0',
        item.stock_minimo?.toString() || '0',
        item.stock_maximo?.toString() || '0',
        item.stock_critico?.toString() || '0',
        item.series ? item.series.join(', ') : '',
      ];

      // eslint-disable-next-line prefer-const
      let rowHeights = row.map(text =>
        calculateRowHeight(text, columnWidth - 10),
      );
      // eslint-disable-next-line prefer-const
      let maxRowHeight = Math.max(...rowHeights, 25) + 28; // Aumenta en 1 cm

      if (yPosition - maxRowHeight < margin) {
        page = pdfDoc.addPage([595, 842]);
        yPosition = height - margin;
      }

      row.forEach((text, index) => {
        drawCell(
          text,
          margin + index * columnWidth,
          yPosition,
          columnWidth,
          maxRowHeight,
        );
      });

      yPosition -= maxRowHeight;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Reporte_Stock.pdf';
    link.click();
  };

  const { motivoTransferenciaColumns } = useColumnsReporteStock();

  return (
    <SingleTableBoxScene title="Reporte Stock" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por producto"
        sxContainer={{ mb: 3 }}
        customSpaceNode={
          <>
            <Grid sx={{ m: '5px' }}>
              <Button onClick={handleDownloadExcel}>Descargar Excel</Button>
            </Grid>
            <Grid sx={{ m: '5px' }}>
              <Button onClick={handleDownloadPDF}>Descargar PDF</Button>
            </Grid>
          </>
        }
      />

      <CustomTable<UbicacionProducto>
        columns={motivoTransferenciaColumns}
        data={reporteStockPagingRes?.data?.items || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        enableManualFiltering
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        enableGlobalFilter={false}
        pagination={pagination}
        onPaging={setPagination}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default MotivoReporteStockPages;
