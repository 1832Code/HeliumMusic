import React from 'react'
import { useState } from 'react';
import { FiUser, FiChevronDown, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';


export const Avatar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, token, user } = useAuth();
  
    if (!token) {
      return <a href="/login">Iniciar sesión</a>;  // Cambié "/" por "/login" para claridad
    }
  
    return (
      <div className="relative">
        {/* Avatar */}
        <div 
          className="flex items-center gap-2 cursor-pointer bg-amber-800 text-white p-2 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiUser className="text-xl" />
          <h4 className='text-sm'>{user?.fullName || user?.username || "Usuario"}</h4>
          <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
  
        {/* Menú desplegable */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2">
                <p className='text-sm font-medium text-gray-800'>{user?.fullName || 'Usuario'}</p>
              <p className='text-xs text-gray-600'>{user?.email || 'No disponible'}</p>
            </div>
            <a 
              href="/perfil" 
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              <FiUser className="inline mr-2" />
              Perfil
            </a>
            <a 
              href="#settings" 
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              <FiSettings className="inline mr-2" />
              Configuración
            </a>
            <div className="border-t border-gray-200 my-1"></div>
            <button 
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              <FiLogOut className="inline mr-2" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    );
  };