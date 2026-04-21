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
  Divider 
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

const ExpenseList = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <Card elevation={0} sx={{ borderRadius: 4, textAlign: 'center', p: 5 }}>
        <Typography color="text.secondary">No transactions found for this period.</Typography>
      </Card>
    );
  }

  return (
    <Card elevation={0} sx={{ borderRadius: 4 }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Transactions</Typography>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', fontWeight: 600 }}>View All</Typography>
        </Box>
        <Divider />
        <List sx={{ py: 0 }}>
          {expenses.map((expense, index) => {
            const catSettings = CATEGORY_ICONS[expense.category] || CATEGORY_ICONS.Other;
            return (
              <React.Fragment key={expense.id}>
                <ListItem sx={{ py: 2, px: 3 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: catSettings.bg, color: catSettings.color }}>
                      {catSettings.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {expense.description || expense.category}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {expense.category} • {expense.date}
                      </Typography>
                    }
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      ₹{Number(expense.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </Typography>
                  </Box>
                </ListItem>
                {index < expenses.length - 1 && <Divider component="li" />}
              </React.Fragment>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
