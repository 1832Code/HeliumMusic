import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className=" flex gap-4 flex-col  p-4">
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
