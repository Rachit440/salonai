import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard: React.FC<{ icon: string; name: string; id: string }> = ({ icon, name, id }) => (
  <Link to={`/browse?category=${id}`} className="flex flex-col items-center p-6 bg-white dark:bg-surface rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
    <span className="text-4xl mb-2">{icon}</span>
    <span className="font-medium text-gray-800 dark:text-white">{name}</span>
  </Link>
);

export default CategoryCard;
