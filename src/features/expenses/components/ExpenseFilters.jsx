import React from 'react';
import Select from '../../../components/atoms/Select';

const FILTER_CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'Food', label: 'Food & Dining' },
  { value: 'Transport', label: 'Transportation' },
  { value: 'Utilities', label: 'Utilities' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Other', label: 'Other' }
];

const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Date (Newest First)' },
  { value: 'date_asc', label: 'Date (Oldest First)' }
];

const ExpenseFilters = ({ categoryFilter, sortOrder, onCategoryChange, onSortChange }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-end', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
      <div style={{ flex: 1, margin: 0 }}>
        <Select 
          label="Filter by Category"
          options={FILTER_CATEGORIES}
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
        />
      </div>
      <div style={{ flex: 1, margin: 0 }}>
        <Select 
          label="Sort by Date"
          options={SORT_OPTIONS}
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ExpenseFilters;
