import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export const Inicio = ({ onClick }) => {
  const { user } = useAuth();

  return (
    <>
      <div className="bg-[url('/inicio.png')] bg-cover bg-center bg-no-repeat  flex flex-col rounded-2xl">
        <div className="flex flex-row justify-between  gap-3 w-full h-full  p-4">
          <header className="flex gap-3 w-full h-auto text-gray-50 font-bold">
            <button
              onClick={onClick}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              aria-label="Buscar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link to="/">Nosotros</Link>
            <Link to="/">Contacto</Link>
          </header>
          <div className="flex gap-3 text-gray-50 font-bold  w-full justify-end ">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="border-2 border-pink-500 text-white p-2 cursor-pointer hover:bg-transparent hover:border-2 hover:border-pink-500 hover:text-pink-500 "
                >
                  Iniciar Sesion
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-600 p-2 cursor-pointer hover:bg-transparent hover:border-2 hover:border-pink-500 hover:text-pink-500 "
                >
                  Registrarse
                </Link>
              </>
            ) : (
              // eslint-disable-next-line no-undef
              <button onClick={() => logout()}>Cerrar sesión</button>
            )}
          </div>
        </div>
        <main className="flex  gap-3 w-full h-[100vh] gap-6 w-full justify-center items-center p-4 ">
          <div className="flex flex-col gap-3 w-1/2 h-[100vh] justify-center ">
            <div>
              <h1 className="text-5xl text-gray-50">
                La musica Mueve Mundo 🌍🎧
              </h1>
            </div>
            <article>
              <p className="text-gray-300 text-xl">
                Descubre una increíble colección de canciones populares y
                nuevas. Disfruta de tus temas favoritos en alta calidad, sin
                interrupciones. ¡Sea cual sea tu estilo, aquí lo tenemos todo
                para ti!
              </p>
            </article>
            <div className="flex gap-2">
              <button className="bg-pink-500 text-white p-2 cursor-pointer hover:bg-transparent hover:border-2 hover:border-pink-500 hover:text-pink-500 ">
                Descúbrelo ahora
              </button>
              <button className="border-2 border-blue-600 text-white p-2  cursor-pointer hover:bg-transparent hover:border-2 hover:border-blue-600 hover:text-blue-600 ">
                Crear Playlist
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2 h-full"></div>
        </main>
      </div>
    </>
  );
};
