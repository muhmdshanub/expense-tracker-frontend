import { describe, it, expect, vi, beforeEach } from 'vitest';
import { expenseApi } from '../expenseApi';

describe('expenseApi', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('getExpenses should fetch with correct query parameters', async () => {
    const mockData = { data: { items: [], totalAmount: 0, totalCount: 0 } };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await expenseApi.getExpenses('Food', 'date_desc', 1, 10);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('category=Food'));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('page=1'));
    expect(result).toEqual(mockData.data);
  });

  it('createExpense should post data correctly', async () => {
    const expenseData = { amount: 100, category: 'Food', request_id: 'uuid-1' };
    const mockResponse = { success: true, data: { id: '1', ...expenseData } };
    
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await expenseApi.createExpense(expenseData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/expenses'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      })
    );
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw error if fetch fails', async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Server error' }),
    });

    await expect(expenseApi.getExpenses()).rejects.toThrow('Failed to fetch expenses');
  });
});
