import React from 'react';

interface InputProps {
  value?: string | undefined;
  setValue?: (value: string) => void;
  placeHolder: string;
  disabled: boolean;
  label?: string;
  name?: string;
  id?: string;
  maxLength?: number;
  type?: string;
  required?: boolean;
  register?: any;
}

const Input = ({
  setValue,
  value,
  placeHolder,
  id,
  maxLength,
  name,
  disabled,
  label,
  type,
  required,
  register,
}: InputProps) => {
  return (
    <>
      {label?.length && (
        <label className="font-semibold uppercase text-sm pb-2 inline-block" htmlFor="id">
          {label}
        </label>
      )}
      <input
        ref={register}
        className="w-full p-4 border rounded focus:ring-indigo-600 focus:ring-2 outline-none"
        placeholder={placeHolder}
        type={type ? type : 'text'}
        name={name}
        id={id}
        onChange={({ target }) => setValue && setValue(target.value)}
        value={value}
        autoComplete="off"
        maxLength={maxLength ? maxLength : 1000}
        disabled={disabled}
        required={required}
      />
    </>
  );
};

export default Input;
