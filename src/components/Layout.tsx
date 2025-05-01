// src/components/Layout.tsx
import React from 'react';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import FilterInput from './FilterInput';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Layout: React.FC = () => {
  const editingItemId = useSelector((state: RootState) => state.items.editingItemId);

  return (
    <div>
      <h1>Заказы</h1>
      <FilterInput />
      <ItemForm editingItemId={editingItemId} />
      <ItemList />
    </div>
  );
};

export default Layout;
