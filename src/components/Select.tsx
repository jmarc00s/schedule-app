import React from 'react';

interface SelectProps {
  property: string;
  label: string;
  placeholder: string;
  values: any[];
  handleSelectChange: (id: number) => void;
}

const Select = ({
  placeholder,
  values,
  handleSelectChange,
  property,
  label,
}: SelectProps) => {
  return (
    <>
      <label htmlFor="select">{label}</label>
      <select
        name="select"
        className="w-full p-4 border rounded focus:ring-indigo-600 focus:ring-2 outline-none"
        onChange={({ target }) => handleSelectChange(Number(target.value))}
      >
        <option selected disabled value="">
          {placeholder}
        </option>

        {values.map((value) => (
          <option key={value.id} value={value.id}>
            {value[property]}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
