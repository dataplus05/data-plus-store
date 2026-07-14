import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      icon,
      id,
      className = "",
      required,
      ...props
    },
    ref
  ) => {
    const inputId =
      id ?? props.name ?? `input-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-bold text-gray-800"
          >
            {label}

            {required && (
              <span className="mr-1 text-red-500">*</span>
            )}
          </label>
        )}

        <div className="relative">
          <input
            {...props}
            ref={ref}
            id={inputId}
            required={required}
            className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
              icon ? "pe-11" : ""
            } ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                : "border-gray-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            } ${className}`}
          />

          {icon && (
            <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </span>
          )}
        </div>

        {error ? (
          <p className="mt-2 text-xs font-semibold text-red-600">
            {error}
          </p>
        ) : (
          hint && (
            <p className="mt-2 text-xs leading-5 text-gray-500">
              {hint}
            </p>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;