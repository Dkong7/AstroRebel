// src/components/Logo.tsx
const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img 
        src="/logo.svg" 
        alt="Astro Rebel Logo" 
        className="w-full h-full object-contain drop-shadow-lg" 
      />
    </div>
  );
};
export default Logo;