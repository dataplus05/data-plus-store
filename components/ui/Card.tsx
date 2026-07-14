import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

export default function Card({
  title,
  description,
  children,
  action,
  className = "",
}: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {(title || description || action) && (
        <div className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && (
              <h2 className="text-lg font-black text-gray-950">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm leading-6 text-gray-500">
                {description}
              </p>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>
      )}

      <div className="p-6">{children}</div>
    </section>
  );
}