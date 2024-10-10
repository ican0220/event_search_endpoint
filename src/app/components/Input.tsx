"use client";
import React from "react";
import classNames from "classnames";

interface InputProps {
  type: string;
  value: string | undefined;
  className: string;
  placeHolder: string;
  onChange: (x: string) => void;
}
const Input: React.FC<InputProps> = ({
  type,
  value,
  className,
  placeHolder,
  onChange
}) => {
  return (
    <input
      type={type}
      className={classNames("", className)}
      placeholder={placeHolder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
