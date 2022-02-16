import React from 'react';

interface FormInputProps {
  label: string;
}

const FormInput = ({ label, ...inputProps }: FormInputProps) => {
  return (
    <>
      {label?.length && (
        <label className="font-semibold uppercase text-sm pb-2 inline-block" htmlFor="id">
          {label}
        </label>
      )}
      <input
        className="w-full p-4 border rounded focus:ring-indigo-600 focus:ring-2 outline-none"
        autoComplete="off"
        {...inputProps}
      />
    </>
  );
};

export default FormInput;
