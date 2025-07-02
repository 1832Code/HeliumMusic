// Search.jsx
import React, { useState, useEffect } from 'react';
import { SearchInput } from './inputSeacrh';

export const MusicLanzadas= () => {
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    albums: [],
    artists: [],
    playlists: [],
    topResults: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '527cff49c8msh24abaf8fa6dac97p165b69jsn90d13d180702',
      'x-rapidapi-host': 'spotify23.p.rapidapi.com'
    }
  };

  async function searchSpotify(term) {
    if (!term.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${term}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
      let response = await fetch(url, options);
      let data = await response.json();
      
      setSearchResults({
        tracks: data.tracks?.items || [],
        albums: data.albums?.items || [],
        artists: data.artists?.items || [],
        playlists: data.playlists?.items || [],
        topResults: data.topResults?.items || []
      });
    } catch (error) {
      setError(`Error al buscar: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Para cargar contenido inicial (tendencias, etc.)
  useEffect(() => {
    // Puedes cargar datos iniciales aquí
    searchSpotify('popular'); // O cualquier término que devuelva contenido popular
  }, []);

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    searchSpotify(term);
  };

  const renderSection = (title, items, type) => {
    if (!items || items.length === 0) return null;
    
    return (
      <section className="mb-12">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.slice(0, 5).map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              {type === 'track' && (
                <>
                  <img
                    src={item.data?.albumOfTrack?.coverArt?.sources[0]?.url}
                    alt={item.data.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 truncate">{item.data.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 truncate">
                      {item.data.artists?.items?.map(artist => artist.profile.name).join(', ')}
                    </p>
                    <a href={item.data.uri} target="_blank" rel="noopener noreferrer" className="block">
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300 text-sm">
                        Reproducir
                      </button>
                    </a>
                  </div>
                </>
              )}
              
              {type === 'artist' && (
                <>
                  <img
                    src={item.data?.visuals?.avatarImage?.sources[0]?.url}
                    alt={item.data.profile.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 truncate">{item.data.profile.name}</h3>
                    <a href={item.data.uri} target="_blank" rel="noopener noreferrer" className="block">
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300 text-sm">
                        Ver artista
                      </button>
                    </a>
                  </div>
                </>
              )}
              
              {type === 'album' && (
                <>
                  <img
                    src={item.data?.coverArt?.sources[0]?.url}
                    alt={item.data.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 truncate">{item.data.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 truncate">
                      {item.data.artists?.items?.map(artist => artist.profile.name).join(', ')}
                    </p>
                    <a href={item.data.uri} target="_blank" rel="noopener noreferrer" className="block">
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300 text-sm">
                        Ver álbum
                      </button>
                    </a>
                  </div>
                </>
              )}
              
              {type === 'playlist' && (
                <>
                  <img
                    src={item.data?.images?.items[0]?.sources[0]?.url}
                    alt={item.data.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 truncate">{item.data.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 truncate">
                      {item.data.owner?.name}
                    </p>
                    <a href={item.data.uri} target="_blank" rel="noopener noreferrer" className="block">
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300 text-sm">
                        Ver playlist
                      </button>
                    </a>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Spotify Explorer</h1>
        <p className="text-gray-600 text-center">Descubre música, artistas y más</p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="w-full max-w-2xl">
          <SearchInput onSearch={handleSearchSubmit} />
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && (
        <div className="space-y-12">
          {/* Sección de Top Results */}
          {searchTerm && renderSection('Resultados principales', searchResults.topResults, 'track')}
          
          {/* Sección de Lanzamientos recientes */}
          {renderSection('Lanzamientos Recientes', searchResults.albums, 'album')}
          
          {/* Sección de Canciones en Tendencia */}
          {renderSection('Canciones en Tendencia', searchResults.tracks, 'track')}
          
          {/* Sección de Artistas Populares */}
          {renderSection('Artistas Populares', searchResults.artists, 'artist')}
          
          {/* Sección de Top Albums */}
          {renderSection('Top Albums', searchResults.albums, 'album')}
          
          {/* Sección de Playlists */}
          {renderSection('Modo PlayList', searchResults.playlists, 'playlist')}
          
          {/* Nota: La API no parece devolver videos musicales, necesitarías otra endpoint para eso */}
        </div>
      )}
    </div>
  );
};