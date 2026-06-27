import React from 'react';
import { User, Mail, Lock, GraduationCap } from 'lucide-react';

interface FloatingInputProps {
  label: string;
  type: string;
  onChange: (value: string) => void;
  icon: 'user' | 'mail' | 'lock' | 'graduation';
  placeholder: string;
  value: string;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const ICON_MAP = {
  user: User,
  mail: Mail,
  lock: Lock,
  graduation: GraduationCap,
};

export function FloatingInput({ 
  label, 
  type, 
  placeholder, 
  value, 
  onChange, 
  icon, 
  isPassword = false, 
  showPassword = false, 
  onTogglePassword 
}: FloatingInputProps) {
  const IconComponent = ICON_MAP[icon];
  const [showPasswordState, setShowPasswordState] = React.useState(false);
  
  // Use local state if parent doesn't control it
  const isPasswordVisible = showPassword !== undefined ? showPassword : showPasswordState;
  const togglePassword = onTogglePassword || (() => setShowPasswordState(!showPasswordState));

  return (
    <div className="group space-y-1.5">
      <label className="text-[11px] font-black uppercase tracking-widest text-[#949293] block px-1 group-focus-within:text-[#EEB30D] transition-colors duration-200">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-5 text-[#949293] group-focus-within:text-[#EEB30D] transition-colors duration-200">
          <IconComponent size={18} />
        </span>
        <input 
          required
          type={isPassword ? (isPasswordVisible ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-[#393536]/5 dark:bg-white/5 border-2 border-transparent rounded-2xl focus:bg-white dark:focus:bg-[#393536] focus:border-[#EEB30D]/30 outline-none text-sm font-medium transition-all text-[#393536] dark:text-white placeholder-[#949293]/60"
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 p-1.5 rounded-xl text-[#949293] hover:bg-[#393536]/5 dark:hover:bg-white/5 hover:text-[#393536] dark:hover:text-white transition-all outline-none"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

// Import Eye icons
import { Eye, EyeOff } from 'lucide-react';