import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  MenuItem, 
  Button, 
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Add as AddIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

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
    date: new Date().toISOString().split('T')[0],
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.category) {
      setError('Please select a category');
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    try {
      const request_id = uuidv4();
      await onSubmit({ ...formData, amount: parseFloat(formData.amount), request_id });
      
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
    <Card elevation={0} sx={{ borderRadius: 4, mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton sx={{ bgcolor: 'primary.light', color: 'primary.main', mr: 2, '&:hover': { bgcolor: 'primary.light' } }}>
            <AddIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Add New Expense</Typography>
        </Box>
        
        {error && (
          <Box sx={{ color: 'error.main', mb: 2, p: 1.5, bgcolor: 'error.light', borderRadius: 2, fontSize: '0.875rem', opacity: 0.8 }}>
            {error}
          </Box>
        )}
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Amount (₹)"
              name="amount"
              type="number"
              fullWidth
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              sx={{ bgcolor: 'background.default' }}
            />
            
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              value={formData.category}
              onChange={handleChange}
              required
              sx={{ bgcolor: 'background.default' }}
            >
              <MenuItem value="" disabled>Select category</MenuItem>
              {CATEGORIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Description"
              name="description"
              fullWidth
              placeholder="What was this for?"
              value={formData.description}
              onChange={handleChange}
              sx={{ bgcolor: 'background.default' }}
            />

            <TextField
              label="Date"
              name="date"
              type="date"
              fullWidth
              value={formData.date}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              sx={{ bgcolor: 'background.default' }}
            />

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large"
              disabled={isLoading}
              endIcon={!isLoading && <ArrowForwardIcon />}
              sx={{ mt: 1, py: 1.5, textTransform: 'none', fontSize: '1rem' }}
            >
              {isLoading ? 'Saving...' : 'Save Expense'}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
