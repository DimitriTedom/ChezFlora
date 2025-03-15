import React from 'react';

interface User {
  name: string;
  title: string;
  imageUrl: string;
}

const FounderCard: React.FC<User> = ({ name, title, imageUrl }) => {
  return (
    <div className="relative w-64 h-64 xl:w-72 xl:h-72 overflow-hidden rounded-xl shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default FounderCard;