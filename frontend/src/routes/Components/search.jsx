// Search.jsx
import React, { useState } from 'react';
import { SearchInput } from './inputSeacrh';

export const Search = () => {
  const [canciones, setCanciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '527cff49c8msh24abaf8fa6dac97p165b69jsn90d13d180702',
      'x-rapidapi-host': 'spotify23.p.rapidapi.com'
    }
  };

  async function getSong(searchTerm) {
    setIsLoading(true);
    setError(null);
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=60&numberOfTopResults=5`;
      let data = await fetch(url, options);
      let response = await data.json();
      setCanciones(response.tracks?.items || []);
      console.log(response);
    } catch (error) {
      setError(`No se pudo buscar la canción: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearchSubmit = (searchTerm) => {
    if (searchTerm.trim()) {
      getSong(searchTerm);
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2 text-center'>Spotify Track Search</h1>
        <p className='text-gray-600 text-center'>Encuentra tus canciones favoritas</p>
      </div>

      <div className='flex justify-center mb-8'>
        <div className='w-full max-w-2xl'>
          <SearchInput onSearch={handleSearchSubmit} />
        </div>
      </div>

      {isLoading && (
        <div className='flex justify-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
        </div>
      )}

      {error && (
        <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded'>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && (
        <>
          <h2 className='text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200'>Resultados</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {canciones.length > 0 ? (
              canciones.map((cancion, index) => (
                <div key={index} className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
                  {cancion.data?.albumOfTrack?.coverArt?.sources[0]?.url && (
                    <img
                      src={cancion.data.albumOfTrack.coverArt.sources[0].url}
                      alt={cancion.data.name}
                      className='w-full h-48 object-cover'
                    />
                  )}
                  <div className='p-4'>
                    <h3 className='font-semibold text-lg mb-1 truncate' title={cancion.data.name}>
                      {cancion.data.name}
                    </h3>
                    <p className='text-gray-600 text-sm mb-3 truncate'>
                      {cancion.data.artists?.items?.map(artist => artist.profile.name).join(', ')}
                    </p>
                    {cancion.data?.uri && (
                      <a 
                        href={cancion.data.uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className='block'
                      >
                        <button className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300'>
                          Reproducir en Spotify
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              !isLoading && !error && (
                <div className='col-span-full text-center py-12'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <h3 className='mt-2 text-lg font-medium text-gray-900'>No hay resultados</h3>
                  <p className='mt-1 text-gray-500'>Busca una canción para empezar</p>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};