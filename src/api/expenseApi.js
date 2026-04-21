const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const expenseApi = {
  getExpenses: async (category = '', sort = 'date_desc') => {
    let url = `${API_URL}/expenses`;
    const params = new URLSearchParams();
    
    if (category) params.append("category", category);
    if (sort) params.append("sort", sort);
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    const result = await response.json();
    return result.data || result; // Fallback depending on standard HTTP response wrapper success:true, data:[]
  },

  createExpense: async (expenseData) => {
    const response = await fetch(`${API_URL}/expenses`, {
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
  }
};
