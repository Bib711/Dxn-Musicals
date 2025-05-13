import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useParallax = (elementRef: React.RefObject<HTMLElement>, speed: number = 0.5) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: `${speed * 100}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [elementRef, speed]);
};

export const useRevealAnimation = (elementRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [elementRef]);
};

export const useTypewriterEffect = (elementRef: React.RefObject<HTMLElement>, text: string) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let currentText = '';
    const typeSpeed = 100;
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        currentText += text.charAt(i);
        element.textContent = currentText;
        i++;
        setTimeout(typeWriter, typeSpeed);
      }
    };

    const typing = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        onEnter: () => typeWriter(),
        once: true,
      },
    });

    return () => {
      typing.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [elementRef, text]);
};

export const useWaveAnimation = (elementRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const waveAnimation = gsap.to(element, {
      y: -15,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      waveAnimation.kill();
    };
  }, [elementRef]);
};