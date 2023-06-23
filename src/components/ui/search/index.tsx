import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

export interface SearchProps {
  className?: string;
  value?: string | undefined;
  name: string;
  id: string;
  onChange: any;
}
export const Search: React.FC<SearchProps> = (
  { className, value, onChange },
  props
) => {

  return (
    <div className={classNames(styles["root"], className)}>
      <input
        onChange={onChange}
        {...props}
        defaultValue={value}
        type="text"
        placeholder="Search"
      />
    </div>
  );
};
