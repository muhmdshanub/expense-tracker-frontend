import React, { useState, useEffect, useMemo } from 'react';
import { expenseApi } from '../../api/expenseApi';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilters from './components/ExpenseFilters';

const ExpenseApp = () => {
  const [expenses, setExpenses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('date_desc');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const fetchExpenses = async () => {
    setIsLoading(true);
    setFetchError('');
    try {
      const data = await expenseApi.getExpenses(categoryFilter, sortOrder);
      setExpenses(data);
    } catch (err) {
      setFetchError('Failed to fetch expenses. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch when category or sort changes
  useEffect(() => {
    fetchExpenses();
  }, [categoryFilter, sortOrder]);

  const handleAddExpense = async (expenseData) => {
    setIsSubmitting(true);
    try {
      await expenseApi.createExpense(expenseData);
      // Refetch the list to include the newly created expense
      await fetchExpenses();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total visible expenses
  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  }, [expenses]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Personal Expense Tracker</h1>
      
      <ExpenseForm onSubmit={handleAddExpense} isLoading={isSubmitting} />
      
      <ExpenseFilters 
        categoryFilter={categoryFilter}
        sortOrder={sortOrder}
        onCategoryChange={setCategoryFilter}
        onSortChange={setSortOrder}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Transactions</h2>
        <h3 style={{ margin: 0, padding: '0.5rem 1rem', backgroundColor: '#e2e8f0', borderRadius: '4px' }}>
          Total: <span style={{ color: '#0056b3' }}>₹{totalAmount.toFixed(2)}</span>
        </h3>
      </div>

      {fetchError && <div style={{ color: '#dc3545', padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '4px' }}>{fetchError}</div>}
      
      {isLoading && !expenses.length ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading expenses...</div>
      ) : (
        <ExpenseList expenses={expenses} />
      )}
    </div>
  );
};

export default ExpenseApp;
