import React, { ChangeEventHandler } from "react";
import styles from "./index.module.scss";
import classnames from "classnames";
import { ErrorMessage, Field } from "formik";

export interface InputProps {
  customClass?: string;
  value?: string | undefined;
  name: string;
  id?: string;
  onChange?: ChangeEventHandler;
  title?: string;
  type: string;
  placeholder?: string;
  hidden?: boolean;
}
export const Input: React.FC<InputProps> = ({
  customClass,
  name,
  placeholder,
  value,
  onChange,
  title,
  type,
  id,
  hidden,
}) => {
  return (
    <div
      className={classnames(
        styles["root"],
        hidden ? styles["hidden"] : "",
        customClass
      )}
      hidden={hidden}
    >
      <label htmlFor={id} className={styles["title"]} hidden={hidden}>
        {title}
      </label>
      <Field
        className={styles["input"]}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hidden={hidden}
      />

      <ErrorMessage className={styles["error"]} name={name} component="div" />
    </div>
  );
};
