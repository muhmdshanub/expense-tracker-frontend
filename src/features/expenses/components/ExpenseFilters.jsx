import { 
  Box, 
  Chip, 
  Select, 
  MenuItem, 
  FormControl, 
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';
import { 
  FilterList as FilterIcon, 
  DateRange as CalendarIcon, 
  Sort as SortIcon 
} from '@mui/icons-material';

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

const ExpenseFilters = ({ 
  categoryFilter, 
  sortOrder, 
  startDate, 
  endDate, 
  onCategoryChange, 
  onSortChange,
  onStartDateChange,
  onEndDateChange
}) => {
  return (
    <Box sx={{ 
      mb: 3, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2, 
      flexShrink: 0,
      p: 2,
      bgcolor: '#f8fafc',
      borderRadius: 4,
      border: '1px solid rgba(0,0,0,0.04)'
    }}>
      {/* Categories Ribbon */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <FilterIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 1 }} />
        {FILTER_CATEGORIES.map((cat) => (
          <Chip
            key={cat.value}
            label={cat.label}
            size="small"
            onClick={() => onCategoryChange(cat.value)}
            color={categoryFilter === cat.value ? "primary" : "default"}
            sx={{ 
              fontWeight: 700, 
              borderRadius: '8px', 
              fontSize: '0.75rem',
              height: '28px',
              px: 0.5,
              transition: 'all 0.2s',
              bgcolor: categoryFilter === cat.value ? 'primary.main' : 'white',
              border: '1px solid',
              borderColor: categoryFilter === cat.value ? 'primary.main' : 'rgba(0,0,0,0.06)',
              '&:hover': { bgcolor: categoryFilter === cat.value ? 'primary.dark' : 'rgba(0,0,0,0.04)' }
            }}
          />
        ))}
      </Box>

      {/* Tools Ribbon: Range & Sort */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: 'center', pt: 1, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
          <CalendarIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 0.5 }} />
          <TextField
            type="date"
            size="small"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ 
              '& .MuiInputBase-root': { 
                height: 32, 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                borderRadius: '8px', 
                bgcolor: 'white',
                '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' }
              },
              width: 140
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', mx: 0.5 }}>—</Typography>
          <TextField
            type="date"
            size="small"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ 
              '& .MuiInputBase-root': { 
                height: 32, 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                borderRadius: '8px', 
                bgcolor: 'white',
                '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' }
              },
              width: 140
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <SortIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
          <FormControl size="small" sx={{ minWidth: 110 }}>
            <Select
              value={sortOrder}
              onChange={(e) => onSortChange(e.target.value)}
              sx={{ 
                borderRadius: '8px', 
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
    </Box>
  );
};

export default ExpenseFilters;
