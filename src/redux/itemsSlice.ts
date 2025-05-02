// src/redux/itemsSlice.ts
// автоматически генерирует action types на основе названия слайса и редьюсеров
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { ItemsState } from '../types/itemTypes';

const initialState: ItemsState = {
  items: [],
  editingItemId: null,
  filter: '',
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push({ ...action.payload, id: uuidv4() });
    },
    setEditingItem(state, action) {
      state.editingItemId = action.payload;
    },
    updateItem(state, action) {
      const { id, title, price } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.title = title;
        existingItem.price = price;
      }
      state.editingItemId = null;
    },
    deleteItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const {
  addItem,
  setEditingItem,
  updateItem,
  deleteItem,
  setFilter,
} = itemsSlice.actions;

export default itemsSlice.reducer;
