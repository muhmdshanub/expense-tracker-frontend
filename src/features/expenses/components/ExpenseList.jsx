import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Divider,
  Button
} from '@mui/material';
import { 
  Restaurant as FoodIcon, 
  DirectionsCar as TransportIcon, 
  FlashOn as UtilitiesIcon, 
  TheaterComedy as EntertainmentIcon, 
  Receipt as OtherIcon 
} from '@mui/icons-material';

const CATEGORY_ICONS = {
  Food: { icon: <FoodIcon />, color: '#ff9800', bg: '#fff7ed' },
  Transport: { icon: <TransportIcon />, color: '#2196f3', bg: '#eff6ff' },
  Utilities: { icon: <UtilitiesIcon />, color: '#9c27b0', bg: '#faf5ff' },
  Entertainment: { icon: <EntertainmentIcon />, color: '#e91e63', bg: '#fff1f2' },
  Other: { icon: <OtherIcon />, color: '#607d8b', bg: '#f1f5f9' }
};

const ExpenseList = ({ expenses, isLoading, hasMore, onLoadMore }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <Card elevation={0} sx={{ borderRadius: 3, textAlign: 'center', p: 4, bgcolor: 'transparent' }}>
        <Typography color="text.secondary" variant="body2">
          {isLoading ? 'Loading transactions...' : 'No transactions found for this period.'}
        </Typography>
      </Card>
    );
  }

  return (
    <Card elevation={0} sx={{ borderRadius: 3, bgcolor: 'white', overflow: 'visible' }}>
      <CardContent sx={{ p: 0, overflow: 'visible' }}>
        <Box sx={{ 
          px: 2.5, 
          py: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Recent Transactions</Typography>
        </Box>
        <Divider />
        <List sx={{ py: 0 }}>
          {expenses.map((expense, index) => {
            const catSettings = CATEGORY_ICONS[expense.category] || CATEGORY_ICONS.Other;
            return (
              <React.Fragment key={expense.id}>
                <ListItem sx={{ py: 1.5, px: 2.5 }}>
                  <ListItemAvatar sx={{ minWidth: 48 }}>
                    <Avatar sx={{ bgcolor: catSettings.bg, color: catSettings.color, width: 32, height: 32, '& .MuiSvgIcon-root': { fontSize: 18 } }}>
                      {catSettings.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        {expense.description || expense.category}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {expense.category} • {expense.date}
                      </Typography>
                    }
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      ₹{Number(expense.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </Typography>
                  </Box>
                </ListItem>
                {index < expenses.length - 1 && <Divider component="li" sx={{ mx: 2 }} />}
              </React.Fragment>
            );
          })}
        </List>
        
        {hasMore && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Button 
              size="small" 
              onClick={onLoadMore} 
              disabled={isLoading}
              variant="text"
              sx={{ fontWeight: 700, textTransform: 'none' }}
            >
              {isLoading ? 'Loading more...' : 'Load more transactions'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
