import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import Image from "components/ui/image";
import classnames from "classnames";
export interface CardProps {
  className?: string;
  classCustom?: string;
  classThumb?: string;
  onClick?: any;
  href?: string;
  imgCard?: string;
  titleCard?: string;
  qtyCard?: string;
  colorCard?: string;
  sizeCard?: string;
  priceCard?: string;
  textCardOne?: string;
  textCardTwo?: string;
  textCardThree?: string;
  textCardFour?: string;
}

export const CardList: React.FC<CardProps> = ({
  className,
  onClick,
  imgCard,
  titleCard,
  qtyCard,
  colorCard,
  sizeCard,
  priceCard,
  textCardOne,
  textCardTwo,
  textCardThree,
  textCardFour,
}) => {
  return (
    <li onClick={onClick} className={classNames(styles["root"], className)}>
      <ul className={styles["card-list"]}>
        {imgCard && (
          <li className={styles["img"]}>
            <Image alt={imgCard} src={imgCard} />
          </li>
        )}
        <li>{titleCard}</li>
        {qtyCard && <li>{qtyCard}</li>}
        {colorCard && (
          <li>
            <div
              style={{
                backgroundColor: `${colorCard}`,
                width: `25px`,
                height: `25px`,
                borderRadius: `50px`,
              }}
            ></div>
          </li>
        )}
        {sizeCard && <li>{sizeCard}</li>}
        {priceCard && <li>{priceCard.toLocaleString()}</li>}
        {textCardOne && <li>{textCardOne}</li>}
        {textCardTwo && <li>{textCardTwo}</li>}
        {textCardThree && <li>{textCardThree}</li>}
        {textCardFour && <li>{textCardFour}</li>}
      </ul>
    </li>
  );
};

export const Card: React.FC<CardProps> = ({
  className,
  onClick,
  imgCard,
  titleCard,
  qtyCard,
  colorCard,
  sizeCard,
  priceCard,
  textCardOne,
  textCardTwo,
  textCardThree,
  textCardFour,
}) => {
  return (
    <li
      onClick={onClick}
      className={classNames(styles["root"], styles["root-card"], className)}
    >
      <ul className={styles["card"]}>
        {imgCard && (
          <li className={styles["img"]}>
            <Image alt={imgCard} src={imgCard} />
          </li>
        )}
        <li className={styles["title"]}>{titleCard}</li>
        {priceCard && <li>{priceCard.toLocaleString()}</li>}
        {qtyCard && <li>{qtyCard}</li>}
        {sizeCard && <li>{sizeCard}</li>}
        {colorCard && (
          <li className={styles["color"]}>
            <div
              style={{
                backgroundColor: `${colorCard}`,
                width: `10px`,
                height: `10px`,
                borderRadius: `50px`,
              }}
            ></div>
          </li>
        )}
        {textCardOne && <li>{textCardOne}</li>}
        {textCardTwo && <li>{textCardTwo}</li>}
        {textCardThree && <li>{textCardThree}</li>}
        {textCardFour && <li>{textCardFour}</li>}
      </ul>
    </li>
  );
};

export const CardItem: React.FC<CardProps> = ({
  className,
  onClick,
  imgCard,
  titleCard,
  qtyCard,
  colorCard,
  sizeCard,
  priceCard,
  textCardOne,
  textCardTwo,
  textCardThree,
  textCardFour,
}) => {
  return (
    <li onClick={onClick} className={classNames(styles["root"], className)}>
      <ul className={styles["card-item"]}>
        {imgCard && (
          <li className={styles["img"]}>
            <Image alt={imgCard} src={imgCard} />
          </li>
        )}
        <span className={styles["column"]}>
          <li>
            <h3>{titleCard}</h3>
          </li>
          {qtyCard && <li>{qtyCard}x</li>}
          {sizeCard && <li>{sizeCard}</li>}
          {colorCard && (
            <li>
              <div className={styles["pad-color"]}>
                <div
                  className={styles["color"]}
                  style={{
                    backgroundColor: `${colorCard}`,
                  }}
                ></div>
              </div>
            </li>
          )}
        </span>
        {priceCard && (
          <li className={styles["price"]}>{priceCard.toLocaleString()}</li>
        )}
        {textCardOne && <li>{textCardOne}</li>}
        {textCardTwo && <li>{textCardTwo}</li>}
        {textCardThree && <li>{textCardThree}</li>}
        {textCardFour && <li>{textCardFour}</li>}
      </ul>
    </li>
  );
};

export const CardUser: React.FC<CardProps> = ({
  onClick,
  classCustom,
  imgCard,
  titleCard,
  textCardOne,
  textCardTwo,
  textCardThree,
  textCardFour,
}) => {
  return (
    <ul
      onClick={onClick}
      className={classNames(styles["root"], styles["userCard"], classCustom)}
    >
      {imgCard && (
        <li className={styles["img"]}>
          <Image alt={imgCard} src={imgCard} />
        </li>
      )}
      {titleCard && (
        <li className={styles["title"]}>
          <p>{titleCard}</p>
        </li>
      )}

      {textCardOne && (
        <li>
          <p>{textCardOne}</p>
        </li>
      )}
      {textCardTwo && (
        <li>
          <p>{textCardTwo}</p>
        </li>
      )}
      {textCardThree && (
        <li>
          <p>{textCardThree}</p>
        </li>
      )}
      {textCardFour && (
        <li>
          <p>{textCardFour}</p>
        </li>
      )}
    </ul>
  );
};
export const CardUserImg: React.FC<CardProps> = ({
  classCustom,
  onClick,
  imgCard,
  titleCard,
  textCardOne,
  textCardTwo,
  textCardThree,
  textCardFour,
}) => {
  return (
    <ul
      onClick={onClick}
      className={classNames(styles["root"], styles["userCardImg"], classCustom)}
    >
      <span className={styles["column"]}>
        {imgCard && (
          <li className={styles["img"]}>
            <Image alt={imgCard} src={imgCard} />
          </li>
        )}
      </span>
      <span className={styles["column"]}>
        {titleCard && (
          <li className={styles["title"]}>
            <p>{titleCard}</p>
          </li>
        )}

        {textCardOne && (
          <li>
            <p>{textCardOne}</p>
          </li>
        )}
        {textCardTwo && (
          <li>
            <p>{textCardTwo}</p>
          </li>
        )}
        {textCardThree && (
          <li>
            <p>{textCardThree}</p>
          </li>
        )}
        {textCardFour && (
          <li>
            <p>{textCardFour}</p>
          </li>
        )}
      </span>
    </ul>
  );
};

export const CardProductItem: React.FC<CardProps> = ({
  titleCard,
  imgCard,
  priceCard,
  href,
  sizeCard,
  colorCard,
  classCustom,
  classThumb,
  ...props
}) => {
  return (
    <a href={href}>
      <div
        className={classnames(styles["cardProductItem"], classCustom)}
        {...props}
      >
        {imgCard && (
          <div className={classnames(styles["thumb"], classThumb)}>
            <Image alt={imgCard} src={imgCard} />
          </div>
        )}

        <div className={classnames(styles["info"], classCustom)}>
          <p className={styles["title"]}>{titleCard}</p>

          {colorCard && (
            <span
              className={styles["color"]}
              style={{ backgroundColor: `${colorCard}` }}
            ></span>
          )}
          {sizeCard && <p className={styles["size"]}>{sizeCard}</p>}
          {priceCard && (
            <p className={styles["price"]}>
              {priceCard?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
            </p>
          )}
        </div>
      </div>
    </a>
  );
};
