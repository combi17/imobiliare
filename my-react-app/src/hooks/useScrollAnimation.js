import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (animationClass = 'animate__fadeInUp', threshold = 0.25) => {
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = elementRef.current;

    if (!el || hasAnimated) {
      return;
    }

    el.classList.add('pre-animate');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pre-animate');
          entry.target.classList.add('animate__animated', animationClass);
          setHasAnimated(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [animationClass, threshold, hasAnimated, elementRef.current]);

  return elementRef;
};

export default useScrollAnimation;