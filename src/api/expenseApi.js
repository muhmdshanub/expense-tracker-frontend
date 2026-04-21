const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const expenseApi = {
  getExpenses: async (category = '', sort = 'date_desc', page = 1, limit = 20, startDate = '', endDate = '') => {
    let url = `${API_URL}/api/expenses`;
    const params = new URLSearchParams();
    
    if (category) params.append("category", category);
    if (sort) params.append("sort", sort);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    const result = await response.json();
    return result.data;
  },

  createExpense: async (expenseData) => {
    const response = await fetch(`${API_URL}/api/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create expense');
    }
    
    const result = await response.json();
    return result.data || result;
  },

  checkHealth: async () => {
    try {
      const response = await fetch(`${API_URL}/api/health`);
      if (!response.ok) return false;
      const data = await response.json();
      return data.success;
    } catch (err) {
      console.error('Health check failed:', err);
      return false;
    }
  }
};
