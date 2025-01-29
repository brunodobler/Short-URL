import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-[#9B20C5] via-[#EC25FA] to-[#627A50] text-transparent bg-clip-text">
        Shorten URL
      </span>
    </Link>
  );
};

export default Logo;
