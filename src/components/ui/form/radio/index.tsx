import React, { ChangeEventHandler } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { ErrorMessage, Field } from "formik";

export interface RadioInputProps {
  className?: string;
  value?: string | undefined;
  name: string;
  id?: string;
  onChange: ChangeEventHandler;
  title?: string;
  hidden?: boolean;
}
export const RadioInput: React.FC<RadioInputProps> = (
  { className, name, value, onChange, title, id },
  props
) => {
  return (
    <div className={styles["root"]}>
      <Field
        className={styles["input"]}
        id={id}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
      <label htmlFor={id} className={styles["title"]}>
        {title}
      </label>
      <ErrorMessage className={styles["error"]} name={name} component="div" />
    </div>
  );
};
