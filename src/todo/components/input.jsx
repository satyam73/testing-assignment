import { useCallback } from 'react';
import { hasValidMin, sanitize } from '../../utils/common';

export function Input({ onSubmit, placeholder, label, defaultValue, onBlur }) {
  const handleBlur = useCallback(() => {
    if (onBlur) onBlur();
  }, [onBlur]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        const value = e.target.value.trim();

        if (!hasValidMin(value, 2)) return;

        onSubmit(sanitize(value));
        e.target.value = '';
      }
    },
    [onSubmit]
  );

  return (
    <div className='input-container'>
      <input
        className='new-todo'
        id='todo-input'
        type='text'
        data-testid='text-input'
        autoFocus={true}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <label
        className='visually-hidden'
        htmlFor='todo-input'
        data-testid='input-label'
      >
        {label}
      </label>
    </div>
  );
}
