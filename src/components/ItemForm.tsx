// src/components/ItemForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem, setEditingItem } from '../redux/itemsSlice';
import { RootState } from '../redux/store';
import { Item } from '../types/itemTypes';

interface ItemFormProps {
  editingItemId?: string;
}

const ItemForm: React.FC<ItemFormProps> = ({ editingItemId }) => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  // Если редактируем существующий элемент
  const editingItem = items.find((item) => item.id === editingItemId);

  React.useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setPrice(String(editingItem.price));
    } else {
      setTitle('');
      setPrice('');
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price) return;

    const newItem: Item = {
      id: editingItemId || '',
      title,
      price: Number(price),
    };

    if (editingItemId) {
      dispatch(updateItem(newItem));
    } else {
      dispatch(addItem(newItem));
    }

    setTitle('');
    setPrice('');
    dispatch(setEditingItem(null));
  };

  const isFormFilled = title.trim() !== '' || price.trim() !== '';

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Save</button>

      {isFormFilled && (
        <button
          type="button"
          onClick={() => {
            setTitle('');
            setPrice('');
            dispatch(setEditingItem(null));
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default ItemForm;
