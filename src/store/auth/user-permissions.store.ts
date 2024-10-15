// idb-keyval is used to persist the store in the IndexedDB
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPermissionsStore {
  permissions: string[];
  groups: string[];

  isLoading: boolean;

  setPermissions: (permissions: string[]) => void;
  setGroups: (groups: string[]) => void;
  clear: () => void;
}

export const useUserPermissionsStore = create<UserPermissionsStore>()(
  persist(
    set => ({
      permissions: [],
      groups: [],
      isLoading: true,

      setPermissions: permissions => {
        set({ permissions });
      },
      setGroups: groups => {
        set({ groups });
      },
      clear: () => {
        set({ permissions: [], groups: [] });
      },
    }),

    {
      name: 'user-permissions',
    },
  ),
);
