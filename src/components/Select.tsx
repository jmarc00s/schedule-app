import React from 'react';
import { FieldErrors } from 'react-hook-form';

interface SelectProps {
  property: string;
  label: string;
  placeholder: string;
  values: any[];
  handleSelectChange?: (id: number) => void;
  register?: any;
  errors?: FieldErrors;
  validation?: any;
  name: string;
}

const Select = ({
  placeholder,
  values,
  handleSelectChange,
  property,
  label,
  register,
  errors,
  validation,
  name,
}: SelectProps) => {
  function renderSelect() {
    if (register) {
      return (
        <select
          placeholder={placeholder}
          name={name}
          className="w-full p-4 border rounded focus:ring-indigo-600 focus:ring-2 outline-none"
          defaultValue={''}
          {...register(name, validation)}
        >
          {values.map((value) => (
            <option key={value.id} value={value.id}>
              {value[property]}
            </option>
          ))}
        </select>
      );
    }

    return (
      <select
        name={name}
        placeholder={placeholder}
        className="w-full p-4 border rounded focus:ring-indigo-600 focus:ring-2 outline-none"
        onChange={({ target }) =>
          handleSelectChange && handleSelectChange(Number(target.value))
        }
      >
        {values.map((value) => (
          <option key={value.id} value={value.id}>
            {value[property]}
          </option>
        ))}
      </select>
    );
  }

  return (
    <>
      <label className="font-medium text-base inline-block text-gray-700 " htmlFor={name}>
        {label}
      </label>
      {renderSelect()}
      {errors?.type === 'required' && (
        <span className="font-medium text-red-500 tracking-wide text-xs mt-1 ml-1">
          Campo obrigatório
        </span>
      )}
    </>
  );
};

export default Select;
