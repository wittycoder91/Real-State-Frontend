import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Logo = ({ isDark = false }) => {
  return (
    <h1
      className={cn("font-space text-3xl font-bold text-white/95", {
        "text-gray-900": isDark,
      })}
    >
      <Link to="/">
        <img src='/images/logo.png' alt="Logo" width={150} />
      </Link>
    </h1>
  );
};

export default Logo;
