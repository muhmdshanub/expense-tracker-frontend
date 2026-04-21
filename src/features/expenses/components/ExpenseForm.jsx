import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from '../../../components/atoms/Input';
import Select from '../../../components/atoms/Select';
import Button from '../../../components/atoms/Button';

const CATEGORIES = [
  { value: 'Food', label: 'Food & Dining' },
  { value: 'Transport', label: 'Transportation' },
  { value: 'Utilities', label: 'Utilities' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Other', label: 'Other' }
];

const ExpenseForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Default today
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    try {
      // Generate request_id for backend idempotency
      const request_id = uuidv4();
      
      await onSubmit({ ...formData, amount: parseFloat(formData.amount), request_id });
      
      // On success, reset form (except date)
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      setError(err.message || 'Failed to submit expense');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
      <h3 style={{ marginTop: 0 }}>Add New Expense</h3>
      
      {error && <div style={{ color: '#dc3545', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#f8d7da', borderRadius: '4px' }}>{error}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input 
          label="Amount" 
          name="amount"
          type="number" 
          step="0.01" 
          value={formData.amount} 
          onChange={handleChange} 
          required 
        />
        <Select 
          label="Category" 
          name="category"
          options={CATEGORIES} 
          value={formData.category} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        <Input 
          label="Description" 
          name="description"
          value={formData.description} 
          onChange={handleChange} 
        />
        <Input 
          label="Date" 
          name="date"
          type="date" 
          value={formData.date} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Add Expense'}
      </Button>
    </form>
  );
};

export default ExpenseForm;
