// Search.jsx
import React, { useState } from 'react';
import { SearchInput } from './inputSeacrh'; // Import the new component

export const Search = () => {
  const [canciones, setCanciones] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '527cff49c8msh24abaf8fa6dac97p165b69jsn90d13d180702',
      'x-rapidapi-host': 'spotify23.p.rapidapi.com'
    }
  };

  async function getSong(searchTerm) { // Renamed 'cancion' to 'searchTerm' for clarity
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=30&numberOfTopResults=5`;
      let data = await fetch(url, options);
      let response = await data.json();
      setCanciones(response.tracks.items);
      console.log(response.tracks.items);
    } catch (error) {
      alert(`No se pudo buscar la canción: ${error.message}`); // Access error.message for a cleaner alert
    }
  }

  // This function will be passed to the SearchInput component
  const handleSearchSubmit = (searchTerm) => {
    getSong(searchTerm);
  };

  return (
    <div className='flex flex-col gap-2 bg-gray-300 rounded-2xl p-2'>
      {/* Use the reusable SearchInput component */}
      <div className='flex justify-center items-center gap-2'> {/* This div replaces the form and wraps SearchInput */}
        <SearchInput onSearch={handleSearchSubmit} />
      </div>

      <h2>Canciones</h2>
      <div className='grid grid-cols-3 gap-2'>
        {canciones.length > 0 ? ( // Conditionally render if there are songs
          canciones.map((cancion, index) => (
            <div key={index} className='p-2 bg-white rounded-lg shadow-md'> {/* Added some styling for individual song items */}
              {cancion.data?.albumOfTrack?.coverArt?.sources[0]?.url && (
                <img
                  src={cancion.data.albumOfTrack.coverArt.sources[0].url}
                  alt={cancion.data.name}
                  className='w-full h-auto rounded-md mb-2'
                />
              )}
              <h3 className='font-semibold text-lg mb-1'>{cancion.data.name}</h3> {/* Changed to h3 and added some styling */}
              {cancion.data?.uri && (
                <a href={cancion.data.uri} target="_blank" rel="noopener noreferrer" className='block'>
                  <button className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full'>
                    Reproducir
                  </button>
                </a>
              )}
            </div>
          ))
        ) : (
          <p className='col-span-3 text-center text-gray-600'>Busca una canción para empezar.</p>
        )}
      </div>
    </div>
  );
};