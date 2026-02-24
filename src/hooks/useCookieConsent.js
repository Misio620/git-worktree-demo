import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cookie_consent';

export function useCookieConsent() {
  const [visible, setVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // 稍微延遲讓頁面先渲染，再 slide-up
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = (value) => {
    setAnimateOut(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, value);
      setVisible(false);
      setAnimateOut(false);
    }, 400);
  };

  const accept = () => dismiss('accepted');
  const reject = () => dismiss('rejected');

  return { visible, animateOut, accept, reject };
}
