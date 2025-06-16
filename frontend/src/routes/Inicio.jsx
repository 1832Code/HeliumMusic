import React from "react";
import { Link } from "react-router-dom";

export const Inicio = ({ onClick }) => {
  return (
    <>
      <div className="bg-[url('/inicio.png')] bg-cover bg-center bg-no-repeat p-2">
        <div className="flex flex-row justify-between items-center gap-3 bg-gray-100 p-4">
          <header className=" flex gap-3">
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
          <div className="flex  gap-3">
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </div>
        </div>
        <main>
          <div>
            <h1>La musica Mueve Mundo 🌍🎧</h1>
          </div>
        </main>
        <section>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit,
            ea odit. Sit dolorem quod, cumque nisi iure dolorum eligendi magnam
            in quaerat deserunt optio voluptate nam maiores provident quidem
            corporis!
          </p>
        </section>
        <section>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit,
            ea odit. Sit dolorem quod, cumque nisi iure dolorum eligendi magnam
            in quaerat deserunt optio voluptate nam maiores provident quidem
            corporis!
          </p>
        </section>
        <section>
          <p>
            Lorem i psum dolor sit amet consectetur, adipisicing elit. Suscipit,
            ea odit. Sit dolorem quod, cumque nisi iure dolorum eligendi magnam
            in quaerat deserunt optio voluptate nam maiores provident quidem
            corporis!
          </p>
        </section>
        <section>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit,
            ea odit. Sit dolorem quod, cumque nisi iure dolorum eligendi magnam
            in quaerat deserunt optio voluptate nam maiores provident quidem
            corporis!
          </p>
        </section>
      </div>
    </>
  );
};
