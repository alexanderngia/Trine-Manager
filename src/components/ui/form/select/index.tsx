import classnames from "classnames";
import { ArrowDown } from "components/ui/icon";
import { ChangeEventHandler } from "react";

import { ErrorMessage, Field } from "formik";
import styles from "./index.module.scss";

export interface SelectInputProps {
  onChange?: ChangeEventHandler;
  arrow?: boolean;
  required?: boolean;
  customClass?: string;
  id?: string;
  title?: string;
  name: string;
  list: any;
}

const SelectInput: React.FC<SelectInputProps> = ({
  onChange,
  arrow,
  customClass,
  id,
  title,
  name,
  list,
}) => {
  return (
    <div className={classnames(styles["root"], customClass)}>
      <label htmlFor={id} className={styles["title"]}>
        {title}
      </label>
      <Field onChange={onChange} name={name} id={id} as="select">
        <option value="">Chọn</option>
        {list &&
          list.map(({ name }: any, index: number) => {
            return (
              <option key={name + index} value={name}>
                {name}
              </option>
            );
          })}
      </Field>

      {arrow && <ArrowDown customClass={styles["chevronDown"]} />}
      <ErrorMessage className={styles["error"]} name={name} component="div" />
    </div>
  );
};
export default SelectInput;
