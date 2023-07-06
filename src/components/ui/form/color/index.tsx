import React, { ChangeEventHandler } from "react";
import styles from "./index.module.scss";
import classnames from "classnames";
import { ErrorMessage, Field } from "formik";

export interface ColorInputProps {
  customClass?: string;
  value?: string | undefined;
  name?: string;
  id?: string;
  onChange?: ChangeEventHandler;
  hidden?: boolean;
}
export const ColorInput: React.FC<ColorInputProps> = (
  { customClass, name, value, onChange, id },
  props
) => {
  return (
    <div className={classnames(styles["root"], customClass)}>
      <Field
        className={styles["input"]}
        id={id}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        hidden
      />
      <label style={{backgroundColor: `${value}`}} htmlFor={id} className={styles["title"]}>
      </label>
    </div>
  );
};
