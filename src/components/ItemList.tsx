// src/components/ItemList.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, setEditingItem } from '../redux/itemsSlice';
import { RootState } from '../redux/store';
import { Item } from '../types/itemTypes';

const ItemList: React.FC = () => {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state: RootState) => state.items);

  const handleEdit = (itemId: string) => {
    dispatch(setEditingItem(itemId));
  };

  const handleDelete = (itemId: string) => {
    dispatch(deleteItem(itemId));
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <li key={item.id} className="card-list-item">
            <span>
              {item.title} — {item.price}
            </span>
            <div>
              <button onClick={() => handleEdit(item.id)}>✎</button>
              <button onClick={() => handleDelete(item.id)}>×</button>
            </div>
          </li>
        ))
      ) : (
        <li className="card-list-item">Нет подходящих записей</li>
      )}
    </ul>
  );
};

export default ItemList;
