// This is an autogenerated file from Firebase Studio.
"use client";

import { useState, useEffect } from 'react';

// A custom hook to work with localStorage, with type safety.
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    // This part runs only on the client, to avoid SSR issues with window object.
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
        try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
            typeof storedValue === 'function'
            ? storedValue(storedValue)
            : storedValue;
        // Save state to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
        // A more advanced implementation would handle the error case
        console.error(error);
        }
    }
  }, [key, storedValue]);
  
  // Custom setter function to update state and trigger effect
  const setValue = (value: T) => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
