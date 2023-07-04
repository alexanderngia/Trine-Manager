import React from "react";
import styles from "./button.module.scss";
import classnames from "classnames";
export interface ButtonProps {
  children: any;
  onClick?: any;
  classCustom?: string;
  type?: any;
  disabled?: boolean;
}
export const ButtonMain: React.FC<ButtonProps> = ({
  children,
  onClick,
  classCustom,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames(styles["root"], classCustom)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ButtonSub: React.FC<ButtonProps> = ({
  children,
  onClick,
  classCustom,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames(styles["root"], styles["sub"], classCustom)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
