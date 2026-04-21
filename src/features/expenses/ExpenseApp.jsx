import React, { useState, useEffect, useMemo } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Paper, 
  AppBar, 
  Toolbar, 
  Avatar, 
  IconButton,
  Badge
} from '@mui/material';
import { 
  Notifications as NotificationsIcon, 
  TrendingUp as TrendingUpIcon,
  Wallet as WalletIcon
} from '@mui/icons-material';
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

  useEffect(() => {
    fetchExpenses();
  }, [categoryFilter, sortOrder]);

  const handleAddExpense = async (expenseData) => {
    setIsSubmitting(true);
    try {
      await expenseApi.createExpense(expenseData);
      await fetchExpenses();
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  }, [expenses]);

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)', mb: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 1, width: 32, height: 32 }}>
              <WalletIcon sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>FinTrack</Typography>
            <Box sx={{ ml: 4, display: { xs: 'none', sm: 'flex' }, gap: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5, color: 'primary.main', cursor: 'pointer' }}>Dashboard</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', cursor: 'pointer' }}>Analytics</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', cursor: 'pointer' }}>Settings</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton size="small">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon size="small" />
              </Badge>
            </IconButton>
            <Avatar sx={{ width: 32, height: 32 }} />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column: Title + Form */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: -1 }}>Expense Dashboard</Typography>
              <Typography variant="body1" color="text.secondary">Track and manage your daily expenses efficiently.</Typography>
            </Box>
            
            <ExpenseForm onSubmit={handleAddExpense} isLoading={isSubmitting} />
            
            <Paper sx={{ p: 3, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', color: 'text.primary' }}>
                <TrendingUpIcon />
              </Avatar>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Daily Average</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>₹{(totalAmount / 30).toFixed(2)}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column: Stats + Filters + List */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              {/* Premium Total Card */}
              <Paper 
                elevation={0}
                sx={{ 
                  flex: 1, 
                  p: 3, 
                  borderRadius: 4, 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Typography variant="overline" sx={{ fontWeight: 700, opacity: 0.8 }}>Total Filtered Expenses</Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, my: 1 }}>₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>2.4% vs last month</Typography>
                </Box>
                {/* Decorative circle */}
                <Box sx={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
              </Paper>
              <Box sx={{ flex: 0.5 }} />
            </Box>

            <ExpenseFilters 
              categoryFilter={categoryFilter}
              sortOrder={sortOrder}
              onCategoryChange={setCategoryFilter}
              onSortChange={setSortOrder}
            />

            {fetchError && (
              <Box sx={{ color: 'error.main', p: 2, mb: 3, bgcolor: 'error.light', borderRadius: 2 }}>
                {fetchError}
              </Box>
            )}
            
            <ExpenseList expenses={expenses} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ExpenseApp;
