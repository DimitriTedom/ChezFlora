import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/shop/home">
    <div className="flex items-end">
      <h2 className="text-pink-300 text-2xl">CHEZ</h2>
      <h1 className="text-4xl font-extrabold flex items-end">
        FL
        <img
          src="/ChezFlora__1_-removebg-preview.png"
          alt="flower pink"
          className="w-8 h-9"
        />
        RA
      </h1>
    </div>
    </Link>
  );
};

export default Logo;
