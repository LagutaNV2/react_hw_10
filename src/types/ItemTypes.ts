// src/types/itemTypes.ts
export type Item = {
    id: string;
    title: string;
    price: number;
  };

export type ItemsState = {
  items: Item[];
  editingItemId: string | null;
  filter: string;
};