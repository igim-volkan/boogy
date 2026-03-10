import React from 'react';

const LogoSymbol = ({ className, color = "#fff", style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 218 144.5"
        className={className}
        style={style}
    >
        <path
            fill={color}
            d="M202.6,77.8h-71.4c-15.3-.8-27.4-13.4-27.4-28.8V15.5c0-8.5-6.9-15.5-15.5-15.5H0v51.2c0,8.5,6.9,15.5,15.5,15.5h70c16,0,28.8,12.9,28.8,28.8v33.6c0,8.5,6.9,15.5,15.5,15.5h88.3v-51.2c0-8.5-6.9-15.5-15.5-15.5h0Z"
        />
    </svg>
);

export default LogoSymbol;
