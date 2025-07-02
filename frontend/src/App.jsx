import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { NavBar } from "./routes/Components/NavBar";
import { Inicio } from "./routes/Inicio";
import { Artistas } from "./routes/Artistas";
import { Descubrir } from "./routes/Descubrir";
import { Albums } from "./routes/Albums";
import { Favoritos } from "./routes/Favoritos";
import { Login } from "./routes/auth/Login";
import { Register } from "./routes/auth/Register";
import { Nosotros } from "./routes/Nosotros";
import { Contact } from "./routes/Contact";
import { useAuth } from "./routes/auth/AuthContext";
import { Avatar } from "./routes/Components/Avatar";
import { Perfil } from "./routes/Perfil";
import {SearchInput} from "./routes/Components/inputSeacrh"


function App() {
  const { user } = useAuth();
  const handleHeaderSearch = (searchTerm) => {
    console.log("Searching from Header:", searchTerm);
    // Here you could trigger a global search, update a global state,
    // or navigate to a search results page.
  };
  return (
    <>
      <div className="w-full flex bg-slate-900">
        <div className=" bg-gray-900  flex  min-h-screen bg-amber-800">
          <header className="fixed w-[20%] bg-gray-900 h-screen overflow-auto  p-4">
            <NavBar />
          </header>
        </div>
        <div className="flex flex-col gap-2  p-3  w-[80%] h-28 ml-[20%]">
          <div className="flex flex-row justify-between  gap-3 w-full h-full  p-4 bg-slate-950 rounded-2xl">
            <header className="flex gap-3 w-full h-auto text-gray-50 justify-between items-center">
              <div className="flex gap-2 justify-center items-center">
              <SearchInput onSearch={handleHeaderSearch} placeholder="Buscar" />
              </div>
              <Link
                to="/Nosotros"
                className="text-gray-50 font-bold hover:border-b-2 hover:border-pink-500 transition-all duration-300"
              >
                Nosotros
              </Link>
              <Link
                to="/Contact"
                className="text-gray-50 font-bold hover:border-b-2 hover:border-pink-500 transition-all duration-300"
              >
                Contacto
              </Link>
            </header>
            <div className="flex gap-3 text-gray-50 w-full justify-end  ">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="border-none  text-white p-2 cursor-pointer hover:bg-purple-900 transition-all duration-300  rounded-xs"
                  >
                    Iniciar Sesion
                  </Link>
                  <Link
                    to="/register"
                    className="cursor-pointer bg-purple-950 hover:bg-purple-900 transition-all duration-300  p-2 rounded-xs "
                  >
                    Registrarse
                  </Link>
                </>
              ) : (
                // eslint-disable-next-line no-undef
                <Avatar />
              )}
            </div>
          </div>
          <main className="w-full h-auto bg-slate-950">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/artistas" element={<Artistas />} />
              <Route path="/descubrir" element={<Descubrir />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
