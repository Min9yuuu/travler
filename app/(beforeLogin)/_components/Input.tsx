'use client';

import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

interface InputProps {
  label?: string;
  errors?: string[];
  name: string;
}

function Input({ label, name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const [focus, setFocus] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2 relative pt-3">
        {label ? (
          <label htmlFor="username" className={`absolute  text-neutral-400 inset-y-4 ml-2 transition-all pointer-events-none ${focus ? 'text-xs inset-y-3.5' : null}`}>
            {label}
          </label>
        ) : null}
        <input name={name} id={name} onChange={onChange} className="w-full pt-5 bg-transparent rounded-md ring-1 focus:ring-2 ring-neutral-300 focus:ring-sky-400 focus:outline-none border-none " {...rest} />

        {errors.map((error, idx) => (
          <span className="text-red-400" key={idx}>
            {error}
          </span>
        ))}
      </div>
    </>
  );
}
export default Input;
