import React, { ChangeEventHandler, ReactNode, useState } from "react";
import styles from "./index.module.scss";
import { ArrowDown } from "components/ui/icon";
import classnames from "classnames";
import Image from "components/ui/image";
import { Field } from "formik";

interface InputPaymentProps {
  onChange?: ChangeEventHandler;
  name: string;
  id: string;
  value: string;
  label: string;
  subLabel: string;
  children?: ReactNode;
  arrow?: boolean;
  customCol?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputPayment: React.FC<InputPaymentProps> = ({
  onChange,
  name,
  id,
  value,
  label,
  subLabel,
  children,
  arrow,
  customCol,
  ...props
}) => {
  return (
    <div className={styles["root"]}>
      <Field
        name={name}
        id={id}
        onChange={onChange}
        type="radio"
        value={value}
        required
        {...props}
      />
      <label className={styles["label"]} htmlFor={id}>
        <div className={classnames(styles["col"], customCol)}>
          {children}
          {arrow && <ArrowDown customClass={styles["chevronDown"]} />}
        </div>

        <div className={classnames(styles["col"], styles["describe"])}>
          <span>{subLabel}</span>
          <p>{label}</p>
        </div>
      </label>
      <div className={styles["descript"]}>
        {id === "BT" && (
          <div className={styles["info"]}>
            <div className={styles["col"]}>
              <div className={styles["img"]}>
                <Image alt="qr.jpg" src="qr.jpg" />
              </div>
              <p>
                <strong>QUÉT MÃ ĐỂ CHUYỂN KHOẢN</strong>
              </p>
            </div>
            <div className={styles["col"]}>
              <h5>
                <strong>THÔNG TIN TÀI KHOẢN</strong>
              </h5>
              <p>
                Chủ Tài Khoản: <strong>NGUYEN GIA BAO</strong>
              </p>
              <p>
                Số Tài Khoản: <strong>0191000328697</strong>
              </p>
              <p>
                Ngân Hàng: <strong>VIETCOMBANK</strong>
              </p>
              <p>
                Nội Dung: <strong>HỌ TÊN + SĐT</strong>
              </p>
              <p>
                *Lưu ý: Đơn hàng sẽ được vận chuyển sau khi chúng tôi nhận được
                thanh toán của quý khách
              </p>
            </div>
          </div>
        )}
        {id === "MOMO" && (
          <div className={styles["info"]}>
            <div className={styles["col"]}>
              <div className={classnames(styles["img"], styles["momo"])}>
                <Image alt="qrMomo.jpg" src="qrMomo.jpg" />
              </div>
              <p>
                <strong>QUÉT MÃ ĐỂ CHUYỂN KHOẢN</strong>
              </p>
            </div>
            <div className={styles["col"]}>
              <h5>
                <strong>THÔNG TIN TÀI KHOẢN</strong>
              </h5>
              <p>
                Chủ Tài Khoản: <strong>NGUYEN GIA BAO</strong>
              </p>

              <p>
                Nội Dung: <strong>HỌ TÊN + SĐT</strong>
              </p>
              <p>
                *Lưu ý: Đơn hàng sẽ được vận chuyển sau khi chúng tôi nhận được
                thanh toán của quý khách
              </p>
            </div>
          </div>
        )}
        {id === "VISA/MASTERCARD" && (
          <div className={styles["info"]}> VISA/MASTERCARD</div>
        )}
      </div>
    </div>
  );
};

export default InputPayment;
