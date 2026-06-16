import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div className={`bg-white dark:bg-surface rounded-2xl shadow-sm p-5 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`} onClick={onClick}>
    {children}
  </div>
);

export default Card;
