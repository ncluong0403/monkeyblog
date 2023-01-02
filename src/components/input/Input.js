import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    background: ${(props) => props.theme.grayLight};
    border-radius: 6px;
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    width: 100%;
  }
  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({ type = "text", name = "", children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyles hasIcon={children ? true : false}>
      <input type={type} id={name} {...props} {...field} />
      {children}
    </InputStyles>
  );
};

export default Input;
