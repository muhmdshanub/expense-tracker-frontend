import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExpenseForm from '../components/ExpenseForm';
import userEvent from '@testing-library/user-event';

describe('ExpenseForm Component', () => {
  const mockSubmit = vi.fn();

  it('renders correctly with all fields', () => {
    render(<ExpenseForm onSubmit={mockSubmit} isLoading={false} />);
    
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
  });

  it('shows error if category is missing on submit', async () => {
    const user = userEvent.setup();
    render(<ExpenseForm onSubmit={mockSubmit} isLoading={false} />);
    
    const amountInput = screen.getByLabelText(/Amount/i);
    await user.type(amountInput, '100');
    
    const submitBtn = screen.getByRole('button', { name: /Save Expense/i });
    await user.click(submitBtn);
    
    expect(screen.getByText(/Please select a category/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with correct data when valid', async () => {
    const user = userEvent.setup();
    render(<ExpenseForm onSubmit={mockSubmit} isLoading={false} />);
    
    // Fill Amount
    await user.type(screen.getByLabelText(/Amount/i), '150');
    
    // Select Category (MUI Select handles this via listbox)
    const categorySelect = screen.getByLabelText(/Category/i);
    await user.click(categorySelect);
    const option = await screen.findByRole('option', { name: /Food & Dining/i });
    await user.click(option);
    
    // Fill Description
    await user.type(screen.getByPlaceholderText(/What was this for/i), 'Weekly Grocery');
    
    // Submit
    const submitBtn = screen.getByRole('button', { name: /Save Expense/i });
    await user.click(submitBtn);
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
        amount: 150,
        category: 'Food',
        description: 'Weekly Grocery',
        request_id: expect.any(String)
      }));
    });
  });

  it('disables submit button when loading', () => {
    render(<ExpenseForm onSubmit={mockSubmit} isLoading={true} />);
    const submitBtn = screen.getByRole('button', { name: /Saving/i });
    expect(submitBtn).toBeDisabled();
  });
});
