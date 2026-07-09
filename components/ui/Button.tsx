type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
};

export default function Button({
  children,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-xl font-semibold"
    >
      {children}
    </button>
  );
}