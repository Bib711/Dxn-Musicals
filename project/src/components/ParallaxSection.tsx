import React, { useRef } from 'react';
import { useParallax } from '../hooks/useAnimations';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useParallax(sectionRef, speed);

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;