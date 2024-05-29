import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

interface InputProps {
  name: string;
  errors?: string[];
}

function _ContentInput({ name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <input ref={ref} className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 transition ring-neutral-200 focus:ring-sky-500 border-none placeholder:text-neutral-400" name={name} {...rest} />
        {errors.map((error, idx) => (
          <span key={idx} className="text-red-500 font-medium">
            {error}
          </span>
        ))}
      </div>
    </>
  );
}

export default forwardRef(_ContentInput);
