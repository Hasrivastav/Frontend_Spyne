// CustomButton.jsx
import React from 'react';

const CustomButton = ({ children, onClick, style }) => {
    return (
        <button
            onClick={onClick}
            style={{
                ...style,
                backgroundColor: '#3f51b5',
                color: '#fff',
                border: '2px solid #3f51b5',
                borderRadius: '12px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease-in-out',
            }}
            onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
        >
            {children}
        </button>
    );
};

export default CustomButton;
