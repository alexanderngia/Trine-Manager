import { ArrowDown, Bell, LogOut, User } from "components/ui/icon";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { authActions } from "redux/reducers/authSlice";

import styles from "./header.module.scss";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [nameUser, setNameUser] = useState("");
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    if (user) {
      if (Object.keys(user).length > 0) {
        setNameUser(user.fullNameUser);
      }
    }
  }, [user]);

  const openMenuProfile = () => {
    setProfile(!profile);
  };

  const logOut = () => {
    dispatch(authActions.logout());
  };

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div className={styles["root"]}>
      <ul className={styles["profile"]}>
        <li  onClick={openMenuProfile}>
          <img alt="1" className={styles["img"]} src="user.jpg" />
          <p className={styles["title"]}>{nameUser}</p>
          <ArrowDown customClass={styles["icon"]} />
        </li>
        {profile && (
          <li className={styles["tab"]}>
            <a href="/member-profile">
              <User customClass={styles["icon"]} />
              <p>Profile</p>
            </a>

            <a href="/" onClick={logOut}>
              <LogOut customClass={styles["icon"]} />
              <p>Đăng Xuất</p>
            </a>
          </li>
        )}
      </ul>

      <div className={styles["notify"]}>
        <div className={styles["notification"]}></div>
        <Bell customClass={styles["icon"]} />
      </div>
    </div>
  );
};

export default Header;
