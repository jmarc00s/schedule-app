import React, { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: any;
  name?: string;
  errors?: FieldError;
  validation?: any;
}

const Input = ({ label, register, name, errors, validation, ...props }: InputProps) => {
  const errorClasses = `border-2 border-red-500 focus:ring-red-500`;

  function renderInput() {
    if (register) {
      return (
        <input
          id={name}
          className={`w-full p-4 border rounded outline-none focus:ring-2 ${
            errors ? errorClasses : 'focus:ring-indigo-600'
          }`}
          {...register(name, validation)}
          {...props}
        />
      );
    }

    return (
      <input
        id={name}
        className="w-full p-4 border rounded focus:ring-indigo-600 focus:ring-2 outline-none"
        {...props}
      />
    );
  }

  return (
    <>
      {label?.length && (
        <label
          className="font-semibold uppercase text-sm pb-2 inline-block"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      {renderInput()}
      {errors?.type === 'required' && (
        <span className="font-medium text-red-500 tracking-wide text-xs mt-1 ml-1">
          Campo obrigatório
        </span>
      )}
    </>
  );
};

export default Input;
