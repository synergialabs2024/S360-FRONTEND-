import { MRT_PaginationState } from 'material-react-table';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type SearchByDateFrom = {
  fecha: string;
  fechaFin: string;
};

export const useTableFilter = () => {
  ///* debouncer
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  ///* table state
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDesde, setSearchDesde] = useState<string>('');
  const [searchHasta, setSearchHasta] = useState<string>('');

  const onChangeFilter = (term: string) => {
    // to display the search term in the search box
    setGlobalFilter(term);

    // debouncing
    if (timerRef) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setSearchTerm(term);
    }, 610);
  };

  ///* form
  const form = useForm<SearchByDateFrom>();

  return {
    searchTerm,
    pagination,
    globalFilter,
    searchDesde,
    searchHasta,
    setPagination,
    setGlobalFilter,
    setSearchTerm,
    onChangeFilter,
    setSearchDesde,
    setSearchHasta,

    form,
  };
};
