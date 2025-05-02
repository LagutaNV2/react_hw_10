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

  const [formState, setFormState] = useState({
    title: '',
    price: '',
  });

  // Если редактируем существующий элемент
  const editingItem = items.find((item) => item.id === editingItemId);

  React.useEffect(() => {
    if (editingItem) {
      setFormState({
        title: editingItem.title,
        price: String(editingItem.price),
      });
    } else {
      setFormState({ title: '', price: '' });
    }
  }, [editingItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { title, price } = formState;
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

    setFormState({ title: '', price: '' });
    dispatch(setEditingItem(null));
  };

  const isFormFilled = formState.title.trim() !== '' || formState.price.trim() !== '';

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Название"
        value={formState.title}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Цена"
        value={formState.price}
        onChange={handleChange}
      />
      <button type="submit">Save</button>

      {isFormFilled && (
        <button
          type="button"
          onClick={() => {
            setFormState({ title: '', price: '' });
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
