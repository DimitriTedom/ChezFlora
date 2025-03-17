const ChezFloraLoader = () => {
  return (
    <div className="loader-container">
      <div className="flower-spinner">
        <div className="petal-group">
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
        </div>
        <div className="center-circle"></div>
      </div>
      <p className="loading-text">Chargement en cours...</p>
    </div>
  );
};

export default ChezFloraLoader;