import { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
}

const CustomButton = ({
  title = "",
  className = "",
  type = "button",
  children,
  loading = false,
  disabled = false,
  onClick,
  style,
  ...props
}: ButtonProps) => {
  return (
    <button
      title={title}
      className={`${className} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={loading ? undefined : onClick}
      type={type}
      style={style}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
