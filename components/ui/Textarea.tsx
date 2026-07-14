import {
  forwardRef,
  type TextareaHTMLAttributes,
} from "react";

type TextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    hint?: string;
  };

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(
  (
    {
      label,
      error,
      hint,
      id,
      className = "",
      required,
      rows = 6,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id ??
      props.name ??
      `textarea-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-bold text-gray-800"
          >
            {label}

            {required && (
              <span className="mr-1 text-red-500">*</span>
            )}
          </label>
        )}

        <textarea
          {...props}
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          className={`w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm leading-7 text-gray-900 outline-none transition placeholder:text-gray-400 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-gray-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          } ${className}`}
        />

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

Textarea.displayName = "Textarea";

export default Textarea;