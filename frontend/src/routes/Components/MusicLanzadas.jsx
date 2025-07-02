// Search.jsx
import React, { useState, useEffect } from 'react';
import { SearchInput } from './inputSeacrh';

export const MusicLanzadas = () => {
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
      let url = `https://spotify23.p.rapidapi.com/search/?q=${term}&type=multi&offset=0&limit=20&numberOfTopResults=5`;
      let response = await fetch(url, options);
      let data = await response.json();
      console.log(data);
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

  useEffect(() => {
    searchSpotify('popular');
  }, []);

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    searchSpotify(term);
  };

  const renderSection = (title, items, type) => {
    if (!items || items.length === 0) return null;
    
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {items.length > 5 && (
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              Ver todo
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {items.slice(0, 6).map((item, index) => (
            <div 
              key={index} 
              className="bg-spotify-dark-gray rounded-lg p-4 hover:bg-spotify-light-gray transition-all duration-300 group cursor-pointer"
            >
              <div className="relative mb-4">
                <img
                  src={
                    type === 'track' ? item.data?.albumOfTrack?.coverArt?.sources[0]?.url :
                    type === 'artist' ? item.data?.visuals?.avatarImage?.sources[0]?.url :
                    type === 'album' ? item.data?.coverArt?.sources[0]?.url :
                    item.data?.images?.items[0]?.sources[0]?.url
                  }
                  alt={
                    type === 'track' ? item.data.name :
                    type === 'artist' ? item.data.profile.name :
                    item.data.name
                  }
                  className="w-full aspect-square object-cover rounded-md shadow-lg group-hover:shadow-xl transition-shadow"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300/333/cccccc?text=No+Image';
                  }}
                />
                <button 
                  className="absolute bottom-2 right-2 bg-spotify-green rounded-full p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-105"
                  onClick={() => window.open(item.data.uri, '_blank')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <h3 className="font-bold text-white truncate mb-1">
                {type === 'track' ? item.data.name :
                 type === 'artist' ? item.data.profile.name :
                 item.data.name}
              </h3>
              
              <p className="text-sm text-gray-400 truncate">
                {type === 'track' ? item.data.artists?.items?.map(artist => artist.profile.name).join(', ') :
                 type === 'artist' ? 'Artista' :
                 type === 'album' ? item.data.artists?.items?.map(artist => artist.profile.name).join(', ') :
                 item.data.owner?.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-spotify-black pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-spotify-dark-green to-spotify-black pb-12 pt-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              {searchTerm ? `Resultados para "${searchTerm}"` : 'Explora la música'}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Descubre canciones, álbumes, artistas y playlists que se adaptan a tu gusto
            </p>
            <div className="w-full max-w-2xl">
              <SearchInput onSearch={handleSearchSubmit} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-spotify-green mb-4"></div>
              <p className="text-gray-400">Buscando en Spotify...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border-l-4 border-red-500 text-red-200 p-4 mb-8 rounded">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}

        {!isLoading && (
          <div className="space-y-12">
            {/* Sección de Top Results */}
            {searchTerm && renderSection('Resultados principales', searchResults.topResults, 'track')}
            
            {/* Sección de Lanzamientos recientes */}
            {renderSection('Lanzamientos Recientes', searchResults.albums, 'album')}
            
            {/* Sección de Canciones en Tendencia */}
            {renderSection('Canciones populares', searchResults.tracks, 'track')}
            
            {/* Sección de Artistas Populares */}
            {renderSection('Artistas destacados', searchResults.artists, 'artist')}
            
            {/* Sección de Playlists */}
            {renderSection('Playlists recomendadas', searchResults.playlists, 'playlist')}
          </div>
        )}
      </div>
    </div>
  );
};