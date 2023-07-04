import { ButtonMain } from "components/ui/button/button";
import { Add, Download } from "components/ui/icon";
import styles from "./index.module.scss";
import { MouseEventHandler } from "react";

export interface FunctionBtnProps {
  onClickAdd?: MouseEventHandler<SVGSVGElement>;
  onClickDownload?: MouseEventHandler<SVGSVGElement>;
}

const FunctionBtn: React.FC<FunctionBtnProps> = ({
  onClickAdd,
  onClickDownload,
}) => {
  return (
    <div className={styles["root"]}>
      <ButtonMain onClick={onClickAdd} classCustom={styles["btn"]}>
        <Add customClass={styles["icon"]} />
      </ButtonMain>
      <ButtonMain onClick={onClickDownload} classCustom={styles["btn"]}>
        <Download customClass={styles["icon"]} />
      </ButtonMain>
    </div>
  );
};

export default FunctionBtn;
