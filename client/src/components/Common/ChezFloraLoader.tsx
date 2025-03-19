import React from 'react';

const ChezFloraLoader: React.FC = () => {
  return (
    <div className="flora-flower-overlay">
      <div className="flora-flower-container">
        <div className="flower-spinner">
          <div className="petal-group">
            <div className="petal"></div>
            <div className="petal"></div>
            <div className="petal"></div>
            <div className="petal"></div>
          </div>
          <div className="flower-center"></div>
        </div>
        <p className="loading-text">ChezFlora</p>
        <p className="sub-text">Loading...</p>
      </div>
    </div>
  );
};

export default ChezFloraLoader;