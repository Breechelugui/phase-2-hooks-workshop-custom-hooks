// src/exercise/04.js
import { useState, useEffect, useCallback } from "react";

export function useLocalStorage(key, initialValue = null) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      const valueToStore =
        state !== null && typeof state === "object" ? JSON.stringify(state) : state;
      localStorage.setItem(key, valueToStore);
    } catch (err) {
      console.error(err);
    }
  }, [key, state]);

  // Update state if storage changes (other tabs / events)
  const handleStorage = useCallback(
    (event) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue ? JSON.parse(event.newValue) : null;
          setState(newValue);
        } catch {
          setState(event.newValue);
        }
      }
    },
    [key]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [handleStorage]);

  return [state, setState];
}
