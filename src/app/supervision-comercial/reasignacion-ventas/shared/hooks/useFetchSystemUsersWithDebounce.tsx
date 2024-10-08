import { useState } from 'react';

import { useFetchSystemUsers } from '@/actions/app';
import { useDebouncer, UserRolesEnumChoice } from '@/shared';
import { SystemUser } from '@/shared/interfaces';

export type UseFetchSystemUsersWithDebounceParams = {
  onUserSelected: (user: SystemUser | null) => void;
};

export const useFetchSystemUsersWithDebounce = (
  { onUserSelected }: UseFetchSystemUsersWithDebounceParams = {} as any,
) => {
  ///* Estado local para el término de búsqueda
  const [searchUserTerm, setSearchUserTerm] = useState('');

  ///* Estado local para el usuario seleccionado
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);

  ///* Debouncer para el término de búsqueda
  const {
    onChangeFilter: onChangeFilterUser,
    searchTerm: debouncedSearchTerm,
  } = useDebouncer({
    searchTerm: searchUserTerm,
    setSearchTerm: setSearchUserTerm,
  });

  ///* Llamada a la API para obtener los usuarios del sistema
  const {
    data: systemUsersPagingRes,
    isLoading: isLoadingSystemUsers,
    isRefetching: isRefetchingSystemUsers,
  } = useFetchSystemUsers({
    params: {
      razon_social: debouncedSearchTerm,
      role: UserRolesEnumChoice.AGENTE,
      page_size: 60,
    },
  });

  ///* Manejador para cuando se selecciona un usuario
  const onChangeUser = (userId: string) => {
    const user =
      systemUsersPagingRes?.data?.items.find(
        u => (u as any)?.id === parseInt(userId, 10),
      ) || null;
    setSelectedUser(user as any);
    onUserSelected(user as any);
  };

  return {
    users: systemUsersPagingRes?.data?.items || [],
    isLoadingUsers: isLoadingSystemUsers || isRefetchingSystemUsers,
    selectedUser,
    onChangeUser,
    onChangeFilterUser,
    searchUserTerm,
    setSearchUserTerm,

    setSelectedUser,
  };
};
