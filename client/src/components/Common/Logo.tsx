import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/shop/home">
    <div className="flex items-end">
      <h2 className="text-pink-400 text-lg font-bold xl:text-2xl">CHEZ</h2>
      <h1 className="text-2xl xl:text-4xl font-extrabold flex items-end font-Poppins">
        FL
        <img
          src="/ChezFlora__1_-removebg-preview.png"
          alt="flower pink"
          className="w-6 h-6 xl:w-8 xl:h-9"
        />
        RA
      </h1>
    </div>
    </Link>
  );
};

export default Logo;
