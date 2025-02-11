import React, { useState } from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "tel" | string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  id?: string;
  onBlur?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  name,
  id,
  onBlur,
  disabled = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        id={id}
        className={`bg-white border border-light-gray-300 rounded-md text-gray-300 text-base md:text-lg leading-5 md:leading-6 py-2.5 px-4 w-full focus:outline-none ${className} ${disabled ? 'cursor-not-allowed' : ''}`}
      />
      {type === "password" && (
        <span
          onClick={handleTogglePasswordVisibility}
          className="absolute top-1/2  right-3 flex items-center cursor-pointer text-gray-400"
        >
          {showPassword ?  <i className="fa-regular fa-eye"></i> :<i className="fa-regular fa-eye-slash"></i>} 
        </span>
      )}
    </div>
  );
};

export default Input;
