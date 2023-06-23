import React from "react";
import Header from "components/header/header";
import Sidebar from "components/sidebar/sidebar";
import styles from "./index.module.scss";
export interface LayoutProps {
  children: any;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={styles["root"]}>
        <div className={styles["container"]}>
          <div className={styles["sidebar"]}>
            <Sidebar />
          </div>
          <div className={styles["wrapper"]}>
            <Header />
            <div className={styles["main-container"]}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
