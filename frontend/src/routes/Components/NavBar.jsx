import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className=" flex flex-col  gap-4 border-r-2 border-pink-600 shadow-xs  shadow-pink-600 p-2">
      <Link
        to="/"
        className="text-2xl font-bold  text-pink-600 bg-clip-text bg-gradient-to-r from-pink-400 to-purple-60"
      >
        HeliumMusic
      </Link>
      <Link to="/" className="text-white hover:text-amber-200">
        Inicio
      </Link>
      <Link to="/artistas" className="text-white hover:text-amber-200">
        Artistas
      </Link>
      <Link to="/descubrir" className="text-white hover:text-amber-200">
        Descubrir
      </Link>
      <Link to="/albums" className="text-white hover:text-amber-200">
        Albums
      </Link>
      <Link to="/favoritos" className="text-white hover:text-amber-200">
        Favoritos
      </Link>
    </nav>
  );
};
