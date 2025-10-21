import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  label: string;
  onClick?: () => void;
}

export function NavLink({ to, label }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative text-foreground transition-colors hover:text-pink-600 ${
        isActive ? "text-pink-600 font-medium" : ""
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500 rounded-full" />
      )}
    </Link>
  );
}