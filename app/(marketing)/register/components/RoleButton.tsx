import React from 'react';

interface RoleButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export function RoleButton({ active, onClick, icon, label }: RoleButtonProps) {
  return (
    <button 
      type="button" 
      onClick={onClick} 
      className={`relative z-10 flex-1 py-3 text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${
        active ? 'text-[#393536] dark:text-white' : 'text-[#949293]'
      }`}
    >
      {icon} 
      <span>{label}</span>
    </button>
  );
}