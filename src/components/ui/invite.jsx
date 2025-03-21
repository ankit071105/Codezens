import React from 'react';
import styled from 'styled-components';

const invite = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <span className="span"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 21" height={21} width={23} className="svg-icon">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="black" d="M1.97742 19.7776C4.45061 17.1544 7.80838 15.5423 11.5068 15.5423C15.2053 15.5423 18.5631 17.1544 21.0362 19.7776M16.2715 6.54229C16.2715 9.17377 14.1383 11.307 11.5068 11.307C8.87535 11.307 6.74212 9.17377 6.74212 6.54229C6.74212 3.91082 8.87535 1.77759 11.5068 1.77759C14.1383 1.77759 16.2715 3.91082 16.2715 6.54229Z" />
          </svg></span>
        <span className="lable">Invite</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 12px;
    gap: 8px;
    height: 45px;
    width: 150px;
    border: none;
    background: rgb(74, 180, 50);
    border-radius: 50px;
    cursor: pointer;
    position: relative;
  }

  .lable {
    line-height: 22px;
    font-size: 17px;
    color: #fff;
    margin-left: 20px;
    font-family: sans-serif;
    letter-spacing: 1px;
  }

  .button .span {
    border-radius: 50%;
    background-color: rgb(48, 129, 29);
    padding: 10px;
    position: absolute;
    left: 0;
  }

  .button:hover {
    background: rgb(48, 129, 29);
  }

  .button:hover .svg-icon {
    animation: slope 0.8s linear infinite;
  }

  @keyframes slope {
    0% {
    }

    50% {
      transform: rotate(15deg);
    }

    100% {
    }
  }`;

export default invite;
