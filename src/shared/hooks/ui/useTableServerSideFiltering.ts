import dayjs from 'dayjs';
import { MRT_ColumnFilterFnsState } from 'material-react-table';
import { useEffect, useState } from 'react';

export const useTableServerSideFiltering = () => {
  // server side filters - colums table
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFilterFnsState>(
    [] as any,
  );
  const [filterObject, setFilterObject] = useState<any>({});

  // map date in table filter by date - server sider filtering
  useEffect(() => {
    setFilterObject(
      (columnFilters as any)?.reduce((obj: any, item: any) => {
        obj[item.id] = item?.value;
        // date
        if (item.id.includes('fecha') || item.id.includes('date')) {
          obj[item.id] = dayjs(item?.value).format('YYYY-MM-DD');
        }
        // bool
        if (item.value === 'true' || item.value === 'false') {
          obj[item.id] = item.value === 'true';
        }

        return obj;
      }, {}),
    );
  }, [columnFilters]);

  return {
    columnFilters,
    setColumnFilters,
    filterObject,
    setFilterObject,
  };
};
