import React from 'react';

const Input = ({ label, type = "text", value, onChange, required = false, ...props }) => {
  return (
    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
      {label && <label style={{ marginBottom: '0.25rem', fontWeight: 'bold' }}>{label} {required && '*'}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        {...props}
      />
    </div>
  );
};

export default Input;
