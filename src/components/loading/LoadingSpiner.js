import React from "react";
import styled from "styled-components";
const SpinnerStyled = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderSize} solid white;
  border-top: ${(props) => props.borderSize} solid transparent;
  border-bottom: ${(props) => props.borderSize} solid transparent;
  border-radius: 100%;
  animation: spinner 1s infinite linear;
  margin: 0 auto;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const LoadingSpinner = ({ size = "40px", borderSize = "5px" }) => {
  return <SpinnerStyled size={size} borderSize={borderSize}></SpinnerStyled>;
};

export default LoadingSpinner;
