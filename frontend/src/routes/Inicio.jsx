import React from "react";
import { Link } from "react-router-dom";
import { Music } from "./Services/Music";
import { Search } from "./Components/search";
import { MusicLanzadas } from "./Components/MusicLanzadas";
export const Inicio = () => {
  

  return (
    <>
      <div className=" flex flex-col rounded-2xl gap-2 ">
        <main className="flex  gap-3 w-full h-[100vh] justify-center items-center p-4  bg-slate-950 rounded-2xl">
          <div className="flex flex-col gap-4  justify-center items-center ">
            <div className="flex flex-col gap-3">
              <h1 className="text-7xl text-gray-50 font-serif text-center">
                La musica Mueve Mundo <br /> 🌍🎧
              </h1>
            </div>
            <article>
              <p className="text-gray-300 text-md text-center">
                Descubre una increíble colección de canciones populares y
                nuevas. <br /> Disfruta de tus temas favoritos en alta calidad, sin
                interrupciones. <br /> ¡Sea cual sea tu estilo, aquí lo tenemos todo
                para ti!
              </p>
            </article>
            <div className="flex gap-2">
              <button className=" p-2 cursor-pointer text-slate-400 hover:text-slate-100 transition-all duration-300">
                Descúbrelo ahora
              </button>
              <button className="border-2 p-2 border-none bg-gray-950 hover:bg-slate-800 text-slate-100 rounded-xs cursor-pointer">
                Crear Playlist
              </button>
            </div>
          </div>
        </main>
      </div>
      <section>
        <h1 className="text-3xl text-gray-50 font-serif text-center">Explorar Music 🎧</h1>
        <Search />
        <Music />
      </section>
 
      <section>
        <h1>Modo PlayList</h1>
        <MusicLanzadas />
      </section>
    </>
  );
};
