import React from "react";
import { Link } from "react-router-dom";

export const Inicio = () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center gap-3 bg-fuchsia-800 p-2">
        <header className=" flex gap-3">
          <Link to="/">Nosotros</Link>
          <Link to="/">Contacto</Link>
        </header>
        <div className="flex  gap-3">
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
        </div>
      </div>
      <main>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, quia!
          Quia doloribus quam, aspernatur ipsam, adipisci dolore excepturi
          deleniti totam, expedita nisi et vero voluptatibus sint aliquam.
          Minima, eveniet recusandae!
        </p>
      </main>
    </>
  );
};
