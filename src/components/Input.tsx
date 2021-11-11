import React from 'react';

interface InputProps {
  value: string | undefined;
  setValue: (value: string) => void;
  placeHolder: string;
  disabled: boolean;
  name?: string;
  id?: string;
  maxLength?: number;
}

const Input = ({
  setValue,
  value,
  placeHolder,
  id,
  maxLength,
  name,
  disabled,
}: InputProps) => {
  return (
    <input
      className="w-full p-4 border rounded focus:ring-indigo-600 focus:ring-2 outline-none"
      placeholder={placeHolder}
      type="text"
      name={name}
      id={id}
      onChange={({ target }) => setValue(target.value)}
      value={value}
      autoComplete="off"
      maxLength={maxLength ? maxLength : 1000}
      disabled={disabled}
    />
  );
};

export default Input;
