import React from "react";

type SelectBoxProps = {
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  onBlur?: (value: string) => string | void;
  className?: string;
  disabled?: boolean;
};

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  onChange,
  placeholder,
  className,
  disabled = false
}) => {

  return (
    <div className="relative">
      <select
        className={`block w-full py-2.5 px-4  bg-white border border-light-gray-300 rounded-md appearance-none text-gray-400 focus:outline-none ${className}`}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        defaultValue=""
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="!max-h-[350px] text-gray-700 hover:bg-gray-100">
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <i className={`fa-solid fa-angle-down text-black pr-2.5`}></i>
      </div>
    </div>
  );
};

export default SelectBox;
