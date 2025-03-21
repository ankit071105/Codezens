// components/StyledButton.jsx
import React from "react";
import styled from "styled-components";

const StyledButton = ({ children, onClick, disabled }) => {
  return (
    <StyledWrapper>
      <button className="btn" onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    padding: 1.1em 2em;
    background: none;
    border: 2px solid #fff;
    font-size: 15px;
    color: #131313;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    border-radius: 12px;
    background-color: #ecd448;
    font-weight: bolder;
    box-shadow: 0 2px 0 2px #000;
    outline: none;
  }

  .btn:before {
    content: "";
    position: absolute;
    width: 100px;
    height: 120%;
    background-color: #ff6700;
    top: 50%;
    transform: skewX(30deg) translate(-150%, -50%);
    transition: all 0.5s;
  }

  .btn:hover {
    background-color: #4cc9f0;
    color: #fff;
    box-shadow: 0 2px 0 2px #0d3b66;
  }

  .btn:hover::before {
    transform: skewX(30deg) translate(150%, -50%);
    transition-delay: 0.1s;
  }

  .btn:active {
    transform: scale(0.9);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default StyledButton;
