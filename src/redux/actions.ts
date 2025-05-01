// src/redux/actions.ts
// для возможности экспортировать типы действий (констант) в разных файлах
// Типы действий (можно использовать в switch-case, createSlice и т.д.)
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SET_EDITING_ITEM = 'SET_EDITING_ITEM';
export const SET_FILTER = 'SET_FILTER';

export default {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SET_EDITING_ITEM,
  SET_FILTER,
};
