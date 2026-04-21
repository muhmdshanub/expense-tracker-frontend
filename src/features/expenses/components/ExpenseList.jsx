import React from 'react';

const ExpenseList = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>No expenses found for this criteria.</div>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
          <tr>
            <th style={{ padding: '0.75rem' }}>Date</th>
            <th style={{ padding: '0.75rem' }}>Description</th>
            <th style={{ padding: '0.75rem' }}>Category</th>
            <th style={{ padding: '0.75rem', textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id} style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={{ padding: '0.75rem' }}>{expense.date}</td>
              <td style={{ padding: '0.75rem' }}>{expense.description || '-'}</td>
              <td style={{ padding: '0.75rem' }}>
                <span style={{ backgroundColor: '#e9ecef', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  {expense.category}
                </span>
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>
                ₹{Number(expense.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
