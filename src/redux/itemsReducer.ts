// src/redux/itemsReducer.ts
import { v4 as uuidv4 } from 'uuid';
import { Item } from '../types/itemTypes';
import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SET_EDITING_ITEM,
  SET_FILTER,
} from './actions';

type Action =
  | { type: 'ADD_ITEM'; payload: Omit<Item, 'id'> }
  | { type: 'UPDATE_ITEM'; payload: Item }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'SET_EDITING_ITEM'; payload: string | null }
  | { type: 'SET_FILTER'; payload: string };

const initialState = {
  items: [] as Item[],
  editingItemId: null as string | null,
  filter: '',
};

const itemsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: uuidv4() }],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        editingItemId: null,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case SET_EDITING_ITEM:
      return {
        ...state,
        editingItemId: action.payload,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default itemsReducer;
