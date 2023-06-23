import React from "react";
import Header from "components/header/header";
import Sidebar from "components/sidebar/sidebar";
import styles from "./index.module.scss";
export interface LayoutProps {
  children: any;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <div className={styles["root"]}>
            <Sidebar customClass={styles["sidebar"]} />
          <div className={styles["main"]}>
            <Header />
            <div className={styles["wrapper"]}>{children}</div>
          </div>
      </div>
  );
};
