import { useRef } from 'react';

export type UseDebouncerProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  delay?: number;
};

export const useDebouncer = ({
  searchTerm,
  setSearchTerm,
  delay = 600,
}: UseDebouncerProps) => {
  ///* debouncer
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const onChangeFilter = (term: string) => {
    // debouncing
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearchTerm(term);
    }, delay);
  };

  return {
    searchTerm,
    onChangeFilter,
  };
};
