import React, { useState } from "react";
import IconEyeClose from "../../icon/IconEyeClose";
import IconEyeOpen from "../../icon/IconEyeOpen";
import Input from "./Input";

const InputPassToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <>
      <Input
        name="password"
        placeholder="Enter your password"
        control={control}
        type={togglePassword ? "text" : "password"}
      >
        {togglePassword ? (
          <IconEyeOpen
            className="input-icon"
            onClick={() => setTogglePassword(!togglePassword)}
          ></IconEyeOpen>
        ) : (
          <IconEyeClose
            className="input-icon"
            onClick={() => setTogglePassword(!togglePassword)}
          ></IconEyeClose>
        )}
      </Input>
    </>
  );
};

export default InputPassToggle;
