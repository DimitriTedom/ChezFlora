// components/FastFacts.tsx
import React from 'react';
import InfoCard from './InfoCard';

const FAST_FACTS_DATA = [
  {
    number: '10 million',
    description: 'active listings worldwide (as of Sept. 30, 2020)',
  },
  {
    number: '100,000',
    description: 'cities with active Airbnb listings (as of Sept. 30, 2020)',
  },
  {
    number: '220+',
    description: 'countries and regions with Airbnb listings (as of Sept. 30, 2020)',
  },
];

const FastFacts: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-8 lg:px-16 mx-auto">
        {/* Header Section */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            🚀 Fast Facts
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            We’re impartial and independent, creating distinctive, world-class programs and content every day.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FAST_FACTS_DATA.map((fact, index) => (
            <InfoCard
              key={index}
              number={fact.number}
              description={fact.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FastFacts;