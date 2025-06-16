import React from "react";
import { FaPlay, FaHeart, FaEllipsisH } from "react-icons/fa";

export const Music = () => {
  const songs = [
    {
      id: 1,
      title: "title",
      artist: "Artist",
      album: "A Night at the Opera",
      duration: "5:55",
      cover: "https://i.imgur.com/5vT7QnW.jpg",
      likes: 1250000,
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "Michael Jackson",
      album: "After Hours",
      duration: "3:20",
      cover: "https://i.imgur.com/3sLQwQk.jpg",
      likes: 980000,
    },
    {
      id: 3,
      title: " Don't Stop Believin'",
      artist: "Alan Walker",
      album: "÷ (Divide)",
      duration: "3:53",
      cover: "https://i.imgur.com/7jyRwVj.jpg",
      likes: 2100000,
    },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">
        Canciones Destacadas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song) => (
          <div
            key={song.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={song.cover}
                alt={`Portada de ${song.album}`}
                className="w-full h-48 object-cover"
              />
              <button className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transform transition-transform hover:scale-105">
                <FaPlay className="text-lg" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white truncate">
                    {song.title}
                  </h3>
                  <p className="text-gray-400">{song.artist}</p>
                  <p className="text-sm text-gray-500 mt-1">{song.album}</p>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <FaEllipsisH />
                </button>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center text-gray-400">
                  <FaHeart className="text-red-500 mr-1" />
                  <span className="text-sm">{song.likes.toLocaleString()}</span>
                </div>
                <span className="text-sm text-gray-500">{song.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
