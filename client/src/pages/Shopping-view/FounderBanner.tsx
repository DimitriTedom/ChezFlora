import React from 'react';
import { Founders } from '@/data/About.FounderUsers';
import FounderCard from './Carts/FounderCard';

const FounderBanner: React.FC = () => {
  return (
    <div className="py-12">
      <div className="">
        {Founders.map((founder, index) => (
          <FounderCard key={index} {...founder} />
        ))}
      </div>
    </div>
  );
};

export default FounderBanner;