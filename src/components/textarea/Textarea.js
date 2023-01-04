import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    background: ${(props) => props.theme.grayLight};
    border-radius: 6px;
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    width: 100%;
    resize: none;
    min-height: 200px;
  }
  textarea:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  textarea::-webkit-input-placeholder {
    color: #84878b;
  }
  textarea::-moz-input-placeholder {
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

const Textarea = ({
  type = "text",
  name = "",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles>
      <textarea type={type} id={name} {...props} {...field} />
    </TextareaStyles>
  );
};

export default Textarea;
