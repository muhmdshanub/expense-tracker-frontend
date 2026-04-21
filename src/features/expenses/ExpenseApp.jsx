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
  
  // Pagination & meta state
  const [page, setPage] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const LIMIT = 10;

  const fetchExpenses = async (p = 1, append = false) => {
    console.log(`Fetching expenses page: ${p}, filter: ${categoryFilter}, sort: ${sortOrder}, range: ${startDate} to ${endDate}`);
    setIsLoading(true);
    setFetchError('');
    try {
      const data = await expenseApi.getExpenses(categoryFilter, sortOrder, p, LIMIT, startDate, endDate);
      
      if (append) {
        setExpenses(prev => [...prev, ...data.items]);
      } else {
        setExpenses(data.items);
      }
      
      setTotalAmount(Number(data.totalAmount) || 0);
      setTotalCount(data.totalCount || 0);
    } catch (err) {
      setFetchError('Failed to fetch expenses. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset page to 1 when filters, sort, or dates change
  useEffect(() => {
    setPage(1);
    fetchExpenses(1, false);
  }, [categoryFilter, sortOrder, startDate, endDate]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchExpenses(nextPage, true);
  };

  const handleAddExpense = async (expenseData) => {
    setIsSubmitting(true);
    try {
      await expenseApi.createExpense(expenseData);
      // After addition, reset to page 1 to see the newest items
      setPage(1);
      await fetchExpenses(1, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasMore = expenses.length < totalCount;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)', bgcolor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 1, width: 28, height: 28 }}>
              <WalletIcon sx={{ fontSize: 16 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: -0.5 }}>FinTrack</Typography>
            <Box sx={{ ml: 6, display: { xs: 'none', sm: 'flex' }, gap: 4 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5, color: 'primary.main', cursor: 'pointer' }}>Dashboard</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Action items removed as they are not currently functional */}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'hidden' }}>
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Grid container spacing={4} sx={{ height: '100%' }}>
            {/* Left Column: Title + Form */}
            <Grid item xs={12} md={3.5} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '1.75rem', mb: 0.5, letterSpacing: -0.5 }}>Expense Dashboard</Typography>
                <Typography variant="body2" color="text.secondary">Track and manage your daily expenses efficiently.</Typography>
              </Box>
              
              <Box sx={{ flexShrink: 0 }}>
                <ExpenseForm onSubmit={handleAddExpense} isLoading={isSubmitting} />
              </Box>
              
              {/* Daily Average card removed - cleanup */}
            </Grid>

            {/* Right Column: Stats + Filters + List */}
            <Grid item xs={12} md={8.5} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, flexShrink: 0 }}>
                {/* Premium Total Card */}
                <Paper 
                  elevation={0}
                  sx={{ 
                    width: { xs: '100%', sm: '320px' },
                    p: 2.5, 
                    borderRadius: 4, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="overline" sx={{ fontWeight: 700, opacity: 0.9, lineHeight: 1.2, display: 'block', mb: 0.5 }}>Total Filtered Expenses</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, fontSize: '2.25rem', mb: 0.5 }}>₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.8, bgcolor: 'rgba(255,255,255,0.15)', px: 1.5, py: 0.25, borderRadius: '20px' }}>
                    {totalCount} {totalCount === 1 ? 'Transaction' : 'Transactions'}
                  </Typography>
                  <Box sx={{ position: 'absolute', right: -15, top: -15, width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
                </Paper>
              </Box>

              <ExpenseFilters 
                categoryFilter={categoryFilter}
                sortOrder={sortOrder}
                startDate={startDate}
                endDate={endDate}
                onCategoryChange={setCategoryFilter}
                onSortChange={setSortOrder}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />

              {fetchError && (
                <Box sx={{ color: 'error.main', p: 2, mb: 2, bgcolor: 'error.light', borderRadius: 2, fontSize: '0.875rem' }}>
                  {fetchError}
                </Box>
              )}
              
              <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.1)', borderRadius: '10px' } }}>
                <ExpenseList 
                  expenses={expenses} 
                  isLoading={isLoading} 
                  hasMore={hasMore}
                  totalCount={totalCount}
                  onLoadMore={handleLoadMore}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ExpenseApp;
