export default function Loading({ alt }) {
  const color = alt ? 'border-white' : 'border-[var(--primary)]';
  return (
    <div className="flex items-center justify-center">
      <div className={`w-6 h-6 border-2 ${color} border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
}
