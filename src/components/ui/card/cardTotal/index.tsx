import React from "react";
import styles from "./index.module.scss";
export interface CardTotalProps {
  title: string;
  total: string;
  icon: any;
}
const CardTotal: React.FC<CardTotalProps> = ({ icon, total, title }) => {
  return (
    <div className={styles["root"]}>
      <span className={styles["icon"]}>{icon}</span>
      <div className={styles["data"]}>
        <div className={styles["total"]}>{total}</div>
        <div className={styles["title"]}>{title}</div>
      </div>
    </div>
  );
};

export default CardTotal;
