import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from 'react';

interface InputProps {
  name: string;
  errors?: string[];
}

function _ContentTextarea({ name, errors = [], ...rest }: InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>, ref: ForwardedRef<HTMLTextAreaElement>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <textarea ref={ref} name="content" {...rest} className="bg-transparent rounded-md w-full  focus:outline-none ring-1 focus:ring-2 transition ring-neutral-200 focus:ring-sky-500 border-none placeholder:text-neutral-400 resize-y" />
        {errors.map((error, idx) => (
          <span key={idx} className="text-red-500 font-medium">
            {error}
          </span>
        ))}
      </div>
    </>
  );
}

export default forwardRef(_ContentTextarea);
