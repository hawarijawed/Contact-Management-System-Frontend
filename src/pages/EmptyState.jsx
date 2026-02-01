import React from 'react';
import { User } from 'lucide-react';

const EmptyState = () => (
    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <User className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Select a Contact</h2>
        <p className="max-w-xs text-gray-500">Choose a contact from the sidebar to view their details or edit their information.</p>
    </div>
);

export default EmptyState;
