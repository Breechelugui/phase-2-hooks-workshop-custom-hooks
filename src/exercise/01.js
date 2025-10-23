// src/exercise/01.js
import { useState, useEffect } from "react";

// ✅ Main hook
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return { count, increment, decrement };
}

// ✅ Extra credit hook: useDocumentTitle
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// ✅ Component
export default function Counter() {
  const { count, increment, decrement } = useCounter();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
