import React, { useRef, useEffect } from 'react';
import { Music } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useWaveAnimation } from '../hooks/useAnimations';

interface LogoProps {
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ animated = true, size = 'md' }) => {
  const { theme } = useTheme();
  const waveRef = useRef<HTMLDivElement>(null);
  
  // Apply wave animation if animated prop is true
  if (animated) {
    useWaveAnimation(waveRef);
  }

  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div 
      className="flex items-center gap-2" 
      ref={waveRef}
    >
      <Music 
        className={`text-purple-500 ${animated ? 'animate-pulse' : ''}`} 
        size={size === 'sm' ? 20 : size === 'md' ? 24 : 32} 
      />
      <span className={`font-display font-bold ${sizeClasses[size]} text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500`}>
        DxN Musicals
      </span>
    </div>
  );
};

export default Logo;