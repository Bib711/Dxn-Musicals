import React, { useRef, useEffect } from 'react';
import { useTypewriterEffect } from '../hooks/useAnimations';

interface TypewriterHeadingProps {
  text: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({
  text,
  className = '',
  element = 'h2',
}) => {
  const headingRef = useRef<HTMLElement>(null);
  useTypewriterEffect(headingRef, text);
  
  const Element = element;
  
  return (
    <Element
      ref={headingRef}
      className={`overflow-hidden whitespace-nowrap border-r-4 border-purple-500 inline-block ${className}`}
      aria-label={text}
    >
      {/* Content will be populated by typewriter effect */}
    </Element>
  );
};

export default TypewriterHeading;