import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';

function getValue<T,>(key: string, initialValue: T | (() => T)): T {
  const savedValue = localStorage.getItem(key);
  if (savedValue) {
    try {
      return JSON.parse(savedValue) as T;
    } catch (error) {
      console.error('Error parsing JSON from localStorage', error);
      localStorage.removeItem(key);
    }
  }

  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
}

// FIX: Imported Dispatch and SetStateAction types from 'react' to correctly type the return value without relying on the global React namespace.
export function useLocalStorage<T,>(key: string, initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => getValue(key, initialValue));
  const previousKeyRef = useRef(key);
  const skipNextStorageRef = useRef(false);

  useEffect(() => {
    if (previousKeyRef.current !== key) {
      skipNextStorageRef.current = true;
      previousKeyRef.current = key;
      setValue(getValue(key, initialValue));
    }
  }, [key, initialValue]);

  useEffect(() => {
    if (skipNextStorageRef.current) {
      skipNextStorageRef.current = false;
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
