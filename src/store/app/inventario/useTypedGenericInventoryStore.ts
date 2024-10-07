import { GenericInventoryStoreKey } from './generic-inventory-keys.interface';
import { useGenericInventoryStore } from './generic-inventory.store';

export const useTypedGenericInventoryStore = <T>(
  keyStore: GenericInventoryStoreKey,
) => {
  const items = useGenericInventoryStore(
    state => state.items[keyStore] || [],
  ) as T[];

  const addSelectedItem = (params: {
    item: T;
    idKey: string;
    showToast?: boolean;
  }) => {
    useGenericInventoryStore.getState().addSelectedItem({
      item: params.item,
      keyStore,
      idKey: params.idKey,
      showToast: params.showToast,
    });
  };

  const updateSelectedItemValue = (params: {
    idKey: string;
    updatedItem: T;
  }) => {
    useGenericInventoryStore.getState().updateSelectedItemValue({
      keyStore,
      idKey: params.idKey,
      updatedItem: params.updatedItem,
    });
  };

  const removeSelectedItem = (params: { item: T; idKey: string }) => {
    useGenericInventoryStore.getState().removeSelectedItem({
      item: params.item,
      keyStore,
      idKey: params.idKey,
    });
  };

  const setSelectedRow = (item: T | null) => {
    useGenericInventoryStore.getState().setSelectedRow(item);
  };

  const clearOneRecord = () => {
    useGenericInventoryStore.getState().clearOneRecord(keyStore);
  };

  const selectedRow = useGenericInventoryStore(
    state => state.selectedRow,
  ) as T | null;

  return {
    items,
    addSelectedItem,
    updateSelectedItemValue,
    removeSelectedItem,
    setSelectedRow,
    selectedRow,

    clearOneRecord, // clear all of the keyStore
  };
};
