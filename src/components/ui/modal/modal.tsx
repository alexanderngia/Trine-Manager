import React from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";
import { Close } from "components/ui/icon";

export interface ModalProps {
  children: any;
  onClick?: any;
  className?: string;
}
export const Modal: React.FC<ModalProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <div className={classNames(styles["root"], className)}>
      <div className={styles["container"]}>
        <Close onClick={onClick} customClass="close" />
        {children}
      </div>
    </div>
  );
};
