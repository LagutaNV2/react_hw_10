// src/components/FilterInput.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/itemsSlice';

const FilterInput: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="filter-input">
      <input
        type="text"
        placeholder="Фильтр по названию..."
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
    </div>
  );
};

export default FilterInput;
