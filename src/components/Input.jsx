import React from 'react';

const Input = ({ label, id, type = 'text', error, className = '', ...props }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
