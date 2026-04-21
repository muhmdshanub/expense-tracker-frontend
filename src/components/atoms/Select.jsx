import React from 'react';

const Select = ({ label, options, value, onChange, required = false }) => {
  return (
    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
      {label && <label style={{ marginBottom: '0.25rem', fontWeight: 'bold' }}>{label} {required && '*'}</label>}
      <select 
        value={value} 
        onChange={onChange} 
        required={required}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
