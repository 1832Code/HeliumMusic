import React, { useState, useEffect } from 'react';

export const Artistas = () => {
  const [artists, setArtists] = useState([]);
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
      let url = `https://spotify23.p.rapidapi.com/search/?q=${term}&type=artist&offset=0&limit=20&numberOfTopResults=5`;
      let response = await fetch(url, options);
      let data = await response.json();
      setArtists(data.artists?.items || []);
    } catch (error) {
      setError(`Error al buscar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  // Buscar artistas predeterminados al cargar
  useEffect(() => {
    searchSpotify('Bad Bunny'); // Puedes cambiar el artista predeterminado
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchSpotify(searchTerm);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar artistas..."
          className="p-2 rounded border border-gray-300 w-full"
        />
        <button type="submit" className="bg-spotify-green text-black px-4 py-2 rounded">Buscar</button>
      </form>
      {isLoading && <p className="text-white">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {artists.map((item, index) => {
          const artist = item.data;
          const avatar = artist?.visuals?.avatarImage?.sources?.[0]?.url || 'https://via.placeholder.com/300/333/cccccc?text=No+Image';
          const name = artist?.profile?.name || 'Sin nombre';
          return (
            <div key={index} className="bg-spotify-dark-gray rounded-lg p-4 hover:bg-spotify-light-gray transition-all duration-300 group cursor-pointer">
              <div className="relative mb-4">
                <img
                  src={avatar}
                  alt={name}
                  className="w-full aspect-square object-cover rounded-md shadow-lg group-hover:shadow-xl transition-shadow"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300/333/cccccc?text=No+Image';
                  }}
                />
              </div>
              <h3 className="font-bold text-white truncate mb-1">{name}</h3>
              <p className="text-sm text-gray-400 truncate">Artista</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
