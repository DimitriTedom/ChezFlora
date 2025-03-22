import React from 'react';
import styled from 'styled-components';

const ChezFloraLoader = () => {
  return (
    <StyledWrapper>
      <div id="page">
        <div id="container">
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="h3">ChezFlora</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 240, 245, 0.8);

  #page {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  #h3 {
    color: #b22222;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    font-family: 'Cursive', sans-serif;
  }

  #ring {
    width: 190px;
    height: 190px;
    border: 1px solid transparent;
    border-radius: 50%;
    position: absolute;
  }

  #ring:nth-child(1) {
    border-bottom: 8px solid #e91e63; /* Rose vif */
    animation: rotate1 2s linear infinite;
  }

  @keyframes rotate1 {
    from {
      transform: rotateX(50deg) rotateZ(110deg);
    }
    to {
      transform: rotateX(50deg) rotateZ(470deg);
    }
  }

  #ring:nth-child(2) {
    border-bottom: 8px solid #ff5722; /* Rouge orangé */
    animation: rotate2 2s linear infinite;
  }

  @keyframes rotate2 {
    from {
      transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
    }
    to {
      transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
    }
  }

  #ring:nth-child(3) {
    border-bottom: 8px solid #ba68c8; /* Lavande */
    animation: rotate3 2s linear infinite;
  }

  @keyframes rotate3 {
    from {
      transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
    }
    to {
      transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
    }
  }

  #ring:nth-child(4) {
    border-bottom: 8px solid #4caf50; /* Vert frais */
    animation: rotate4 2s linear infinite;
  }

  @keyframes rotate4 {
    from {
      transform: rotateX(70deg) rotateZ(270deg);
    }
    to {
      transform: rotateX(70deg) rotateZ(630deg);
    }
  }
`;

export default ChezFloraLoader;
