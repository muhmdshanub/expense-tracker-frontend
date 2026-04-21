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
    <Box sx={{ mb: 2.5, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center', flexShrink: 0 }}>
      <Box sx={{ flexGrow: 1, display: 'flex', gap: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ mr: 1, fontWeight: 750, color: 'text.secondary', textTransform: 'uppercase' }}>Filter:</Typography>
        {FILTER_CATEGORIES.map((cat) => (
          <Chip
            key={cat.value}
            label={cat.label}
            size="small"
            onClick={() => onCategoryChange(cat.value)}
            color={categoryFilter === cat.value ? "primary" : "default"}
            variant={categoryFilter === cat.value ? "filled" : "outlined"}
            sx={{ 
              fontWeight: 700, 
              borderRadius: '6px', 
              fontSize: '0.75rem',
              height: '26px',
              bgcolor: categoryFilter === cat.value ? 'primary.main' : 'white',
              borderColor: 'rgba(0,0,0,0.08)'
            }}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 750, color: 'text.secondary', textTransform: 'uppercase' }}>Sort:</Typography>
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <Select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            sx={{ 
              borderRadius: '6px', 
              bgcolor: 'white', 
              fontSize: '0.75rem', 
              fontWeight: 700,
              height: '32px',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.08)' }
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ExpenseFilters;
