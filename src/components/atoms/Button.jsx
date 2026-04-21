import React from 'react';

const Button = ({ children, type = "button", disabled = false, onClick, variant = "primary" }) => {
  const baseStyle = { 
    padding: '0.5rem 1rem', 
    borderRadius: '4px', 
    border: 'none', 
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
    opacity: disabled ? 0.6 : 1
  };
  
  const variants = {
    primary: { backgroundColor: '#007BFF', color: 'white' },
    secondary: { backgroundColor: '#6C757D', color: 'white' },
    danger: { backgroundColor: '#DC3545', color: 'white' }
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant] }}
    >
      {children}
    </button>
  );
};

export default Button;
