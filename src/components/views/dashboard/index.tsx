import React from "react";
import styles from "./index.module.scss";
import { Layout } from "components/views/layout";
import { dataDB } from "data/dashboard";
import CardTotal from "components/ui/card/cardTotal";

export interface DashboardProps {}

const DashBoard: React.FC<DashboardProps> = (props) => {
  return (
    <Layout>
      <div className={styles["root"]}>
        <div className={styles["summary"]}>
          {React.Children.toArray(
            dataDB.map((card) => {
              return (
                <CardTotal
                  title={card.title}
                  total={card.total}
                  icon={card.icon}
                />
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
