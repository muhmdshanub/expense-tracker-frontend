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
    <Card elevation={0} sx={{ borderRadius: 3, mb: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton size="small" sx={{ bgcolor: 'primary.main', color: 'white', mr: 1.5, width: 32, height: 32, '&:hover': { bgcolor: 'primary.dark' } }}>
            <AddIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Add New Expense</Typography>
        </Box>
        
        {error && (
          <Box sx={{ color: 'error.main', mb: 2, p: 1, bgcolor: 'error.light', borderRadius: 1.5, fontSize: '0.75rem', opacity: 0.8 }}>
            {error}
          </Box>
        )}
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField
              label="Amount (₹)"
              name="amount"
              type="number"
              fullWidth
              size="small"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
              InputProps={{
                startAdornment: <InputAdornment position="start" sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}>₹</InputAdornment>,
              }}
              sx={{ bgcolor: 'background.default' }}
            />
            
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              size="small"
              value={formData.category}
              onChange={handleChange}
              required
              sx={{ bgcolor: 'background.default' }}
            >
              <MenuItem value="" disabled sx={{ fontSize: '0.875rem' }}>Select category</MenuItem>
              {CATEGORIES.map((option) => (
                <MenuItem key={option.value} value={option.value} sx={{ fontSize: '0.875rem' }}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Description"
              name="description"
              fullWidth
              size="small"
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
              size="small"
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
              size="medium"
              disabled={isLoading}
              endIcon={!isLoading && <ArrowForwardIcon sx={{ fontSize: 16 }} />}
              sx={{ mt: 0.5, py: 1, textTransform: 'none', fontSize: '0.875rem', fontWeight: 700 }}
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
