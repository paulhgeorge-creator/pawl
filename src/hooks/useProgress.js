import { useState, useEffect } from "react";

export function useProgress(pathKey) {
  const storageKey = `pawl_progress_${pathKey}`;

  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, storageKey]);

  const markComplete = (taskId) => {
    setCompleted(prev => ({ ...prev, [taskId]: true }));
  };

  const isComplete = (taskId) => !!completed[taskId];

  const reset = () => {
    setCompleted({});
    localStorage.removeItem(storageKey);
  };

  return { completed, markComplete, isComplete, reset };
}
