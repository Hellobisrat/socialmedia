export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-lg bg-light focus:ring-2 focus:ring-primary outline-none ${className}`}
      {...props}
    />
  );
}