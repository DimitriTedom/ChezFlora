// components/InfoCard.tsx
import React from 'react';

interface InfoCardProps {
  number: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ number, description }) => {
  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
      {/* Gradient Overlay for Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-3">
          {number}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;