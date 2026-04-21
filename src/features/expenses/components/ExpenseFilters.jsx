import React from 'react';
import { 
  Box, 
  Chip, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Typography 
} from '@mui/material';

const FILTER_CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'Food', label: 'Food' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Utilities', label: 'Utilities' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Other', label: 'Other' }
];

const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Newest' },
  { value: 'date_asc', label: 'Oldest' }
];

const ExpenseFilters = ({ categoryFilter, sortOrder, onCategoryChange, onSortChange }) => {
  return (
    <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 1, fontWeight: 600, color: 'text.secondary' }}>Filter:</Typography>
        {FILTER_CATEGORIES.map((cat) => (
          <Chip
            key={cat.value}
            label={cat.label}
            onClick={() => onCategoryChange(cat.value)}
            color={categoryFilter === cat.value ? "primary" : "default"}
            variant={categoryFilter === cat.value ? "filled" : "outlined"}
            sx={{ fontWeight: 600, borderRadius: '8px' }}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>Sort:</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            sx={{ borderRadius: '8px', bgcolor: 'background.paper' }}
          >
            {SORT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ExpenseFilters;
