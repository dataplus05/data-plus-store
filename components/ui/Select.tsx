import {
  forwardRef,
  type SelectHTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps =
  SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    error?: string;
    hint?: string;
    placeholder?: string;
    options: SelectOption[];
  };

const Select = forwardRef<
  HTMLSelectElement,
  SelectProps
>(
  (
    {
      label,
      error,
      hint,
      placeholder,
      options,
      id,
      className = "",
      required,
      ...props
    },
    ref
  ) => {
    const selectId =
      id ??
      props.name ??
      `select-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-2 block text-sm font-bold text-gray-800"
          >
            {label}

            {required && (
              <span className="mr-1 text-red-500">*</span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            {...props}
            ref={ref}
            id={selectId}
            required={required}
            className={`h-12 w-full appearance-none rounded-xl border bg-white px-4 pe-11 text-sm text-gray-900 outline-none transition ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                : "border-gray-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            } ${className}`}
          >
            {placeholder && (
              <option value="">
                {placeholder}
              </option>
            )}

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
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

Select.displayName = "Select";

export default Select;