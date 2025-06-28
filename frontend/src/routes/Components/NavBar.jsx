import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserAstronaut,
  FaCompass,
  FaCompactDisc,
  FaHeart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const NavItem = ({ to, icon: Icon, children }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-md transition-all ${
            isActive
              ? "font-bold bg-pink-700 text-white shadow-md"
              : "text-white hover:bg-pink-800 hover:text-gray-50"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon className={isActive ? "text-pink-400" : "text-pink-400"} />
            {children}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <nav className=" flex flex-col  gap-4 border-r-2 border-purple-950 shadow-xs  shadow-purple-900 p-2">
      <Link
        to="/"
        className="text-2xl font-bold  text-indigo-800 bg-clip-text bg-gradient-to-r from-pink-400 to-purple-60"
      >
        MusicApp
      </Link>
      <h2 className="text-[12px] font-bold  text-pink-600 text-left">Menu</h2>
      <NavItem to="/" icon={FaHome}>
        Inicio
      </NavItem>
      <NavItem to="/artistas" icon={FaUserAstronaut}>
        Artistas
      </NavItem>
      <NavItem to="/descubrir" icon={FaCompass}>
        Descubrir
      </NavItem>
      <NavItem to="/albums" icon={FaCompactDisc}>
        Albums
      </NavItem>

      <h2 className="text-[12px] font-bold  text-pink-600 text-left">
        PlayList and Favorites
      </h2>
      <NavItem to="/favoritos" icon={FaHeart}>
        Favoritos
      </NavItem>
      <h2 className="text-[12px] font-bold  text-pink-600 text-left">Gneral</h2>

      <NavItem to="/config" icon={FaCog}>
        Configuracion
      </NavItem>
      <NavItem to="/login" icon={FaSignOutAlt}>
        Cerrar Sesion
      </NavItem>
    </nav>
  );
};
