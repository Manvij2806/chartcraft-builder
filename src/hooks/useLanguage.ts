import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState('en-US');
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const savedLocale = localStorage.getItem('selectedLocale');
    
    if (savedLanguage && savedLocale) {
      setLanguage(savedLanguage);
      setLocale(savedLocale);
    }
  }, []);

  const changeLanguage = (newLanguage: string, newLocale: string) => {
    setLanguage(newLanguage);
    setLocale(newLocale);
    localStorage.setItem('selectedLanguage', newLanguage);
    localStorage.setItem('selectedLocale', newLocale);
  };

  return {
    language,
    locale,
    changeLanguage,
  };
};