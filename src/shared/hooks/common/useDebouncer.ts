import { useRef } from 'react';

export type UseDebouncerProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const useDebouncer = ({
  searchTerm,
  setSearchTerm,
}: UseDebouncerProps) => {
  ///* debouncer
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const onChangeFilter = (term: string) => {
    // debouncing
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearchTerm(term);
    }, 610);
  };

  return {
    searchTerm,
    onChangeFilter,
  };
};
