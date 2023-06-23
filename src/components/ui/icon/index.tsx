import React from "react";
import styles from "./index.module.scss";
import classnames from "classnames";
export interface IconProps {
  customClass?: string;
}

export const Dashboard: React.FC<IconProps> = ({ customClass }) => {
  return (
    <svg
      className={classnames(styles["root"], customClass)}
      fill="currentColor"
      width="36"
      height="36"
      viewBox="0 0 576 576"
    >
      <path d="M408.327 0H167.187C62.4432 0 0 62.4432 0 167.187V408.039C0 513.07 62.4432 575.513 167.187 575.513H408.039C512.782 575.513 575.225 513.07 575.225 408.327V167.187C575.513 62.4432 513.07 0 408.327 0ZM204.595 428.757C204.595 436.815 198.264 443.145 190.207 443.145H109.923C101.866 443.145 95.5352 436.815 95.5352 428.757V295.814C95.5352 277.685 110.211 263.01 128.339 263.01H190.207C198.264 263.01 204.595 269.34 204.595 277.397V428.757ZM342.143 428.757C342.143 436.815 335.812 443.145 327.755 443.145H247.471C239.414 443.145 233.083 436.815 233.083 428.757V165.172C233.083 147.044 247.758 132.368 265.887 132.368H309.626C327.755 132.368 342.43 147.044 342.43 165.172V428.757H342.143ZM479.978 428.757C479.978 436.815 473.647 443.145 465.59 443.145H385.306C377.249 443.145 370.918 436.815 370.918 428.757V326.604C370.918 318.547 377.249 312.216 385.306 312.216H447.174C465.302 312.216 479.978 326.891 479.978 345.02V428.757Z" />
    </svg>
  );
};

export const Document: React.FC<IconProps> = ({ customClass }) => {
  return (
    <svg
      className={classnames(styles["root"], customClass)}
      fill="currentColor"
      width="36"
      height="36"
      viewBox="0 0 576 606"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M402.649 6.37231C390.236 -6.04047 368.741 2.43656 368.741 19.6933V125.353C368.741 169.555 406.282 206.188 451.997 206.188C480.759 206.491 520.722 206.491 554.933 206.491C572.189 206.491 581.272 186.206 569.162 174.096C525.566 130.197 447.456 51.1794 402.649 6.37231Z" />
      <path d="M544.951 247.953H457.456C385.704 247.953 327.274 189.522 327.274 117.77V30.2751C327.274 13.6238 313.65 0 296.999 0H168.632C75.3849 0 0 60.5502 0 168.632V436.869C0 544.951 75.3849 605.502 168.632 605.502H406.594C499.842 605.502 575.226 544.951 575.226 436.869V278.228C575.226 261.577 561.603 247.953 544.951 247.953ZM272.476 476.832H151.375C138.963 476.832 128.669 466.539 128.669 454.126C128.669 441.713 138.963 431.42 151.375 431.42H272.476C284.888 431.42 295.182 441.713 295.182 454.126C295.182 466.539 284.888 476.832 272.476 476.832ZM333.026 355.732H151.375C138.963 355.732 128.669 345.439 128.669 333.026C128.669 320.613 138.963 310.32 151.375 310.32H333.026C345.439 310.32 355.732 320.613 355.732 333.026C355.732 345.439 345.439 355.732 333.026 355.732Z" />
    </svg>
  );
};
export const Contact: React.FC<IconProps> = ({ customClass }) => {
  return (
    <svg
      className={classnames(styles["root"], customClass)}
      fill="currentColor"
      width="36"
      height="36"
      viewBox="0 0 576 573"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.6198 477.392C9.82884 477.392 0.0509419 467.614 0.0509419 455.823V291.899C-1.38698 213.963 27.6591 140.342 81.7251 85.1252C135.791 30.1964 208.263 0 286.198 0C445.52 0 575.221 129.701 575.221 289.024V452.947C575.221 464.738 565.443 474.516 553.652 474.516C541.861 474.516 532.083 464.738 532.083 452.947V289.024C532.083 153.57 421.938 43.1378 286.198 43.1378C219.766 43.1378 158.223 68.7329 112.497 115.322C66.4831 162.198 42.0384 224.604 43.1887 291.324V455.535C43.1887 467.614 33.6984 477.392 21.6198 477.392Z" />
      <path d="M113.365 299.044H109.626C49.2332 299.044 0.0561523 348.221 0.0561523 408.614V462.68C0.0561523 523.073 49.2332 572.25 109.626 572.25H113.365C173.758 572.25 222.935 523.073 222.935 462.68V408.614C222.935 348.221 173.758 299.044 113.365 299.044Z" />
      <path d="M465.657 299.044H461.918C401.525 299.044 352.348 348.221 352.348 408.614V462.68C352.348 523.073 401.525 572.25 461.918 572.25H465.657C526.049 572.25 575.227 523.073 575.227 462.68V408.614C575.227 348.221 526.049 299.044 465.657 299.044Z" />
    </svg>
  );
};
export const Store: React.FC<IconProps> = ({ customClass }) => {
  return (
    <svg
      className={classnames(styles["root"], customClass)}
      fill="currentColor"
      width="36"
      height="36"
      viewBox="0 0 576 585"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M574.663 194.049L566.646 117.48C555.036 34 517.167 0 436.178 0H370.939H330.031H245.999H205.087H138.746C57.4776 0 19.8841 34 7.99794 118.309L0.534531 194.325C-2.22969 223.902 5.78656 252.65 23.2012 275.04C44.2093 302.406 76.5507 317.886 112.486 317.886C147.315 317.886 180.762 300.471 201.77 272.552C220.567 300.471 252.633 317.886 288.292 317.886C323.947 317.886 355.186 301.3 374.256 273.658C395.544 301.024 428.435 317.886 462.711 317.886C499.476 317.886 532.646 301.577 553.378 272.829C569.963 250.715 577.43 222.796 574.663 194.049Z" />
      <path d="M270.308 425.972C235.202 429.566 208.667 459.419 208.667 494.802V570.541C208.667 578.005 214.748 584.086 222.211 584.086H354.064C361.527 584.086 367.608 578.005 367.608 570.541V504.476C367.885 446.704 333.885 419.338 270.308 425.972Z" />
      <path d="M547.333 363.443V445.817C547.333 522.11 485.414 584.028 409.121 584.028C401.658 584.028 395.577 577.947 395.577 570.484V504.419C395.577 469.037 384.796 441.394 363.788 422.598C345.268 405.736 320.113 397.443 288.878 397.443C281.967 397.443 275.057 397.72 267.593 398.549C218.389 403.524 181.072 444.988 181.072 494.744V570.484C181.072 577.947 174.991 584.028 167.527 584.028C91.2345 584.028 29.3159 522.11 29.3159 445.817V363.996C29.3159 344.646 48.3891 331.655 66.3565 338.012C73.8199 340.5 81.2833 342.435 89.0232 343.541C92.3402 344.094 95.9337 344.646 99.2508 344.646C103.674 345.199 108.096 345.476 112.519 345.476C144.584 345.476 176.096 333.59 200.974 313.134C224.747 333.59 255.707 345.476 288.325 345.476C321.219 345.476 351.626 334.142 375.398 313.687C400.276 333.866 431.235 345.476 462.747 345.476C467.723 345.476 472.699 345.199 477.398 344.646C480.715 344.37 483.756 344.094 486.796 343.541C495.365 342.435 503.105 339.947 510.845 337.459C528.812 331.378 547.333 344.646 547.333 363.443Z" />
    </svg>
  );
};
export const Cart: React.FC<IconProps> = ({ customClass }) => {
  return (
    <svg
      className={classnames(styles["root"], customClass)}
      fill="currentColor"
      width="36"
      height="36"
      viewBox="0 0 600 628"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M443.077 627.692C471.626 627.692 494.769 604.549 494.769 576C494.769 547.451 471.626 524.308 443.077 524.308C414.528 524.308 391.385 547.451 391.385 576C391.385 604.549 414.528 627.692 443.077 627.692Z" />
      <path d="M206.769 627.692C235.318 627.692 258.461 604.549 258.461 576C258.461 547.451 235.318 524.308 206.769 524.308C178.22 524.308 155.077 547.451 155.077 576C155.077 604.549 178.22 627.692 206.769 627.692Z" />
      <path d="M106.043 79.4584L100.135 151.828C98.9538 165.711 109.883 177.231 123.766 177.231H576C588.406 177.231 598.744 167.778 599.631 155.372C603.471 103.089 563.594 60.5538 511.311 60.5538H148.283C145.329 47.5569 139.421 35.1508 130.265 24.8123C115.495 9.15692 94.8184 0 73.5507 0H22.1538C10.0431 0 0 10.0431 0 22.1538C0 34.2646 10.0431 44.3077 22.1538 44.3077H73.5507C82.7077 44.3077 91.2738 48.1477 97.4769 54.6461C103.68 61.44 106.634 70.3015 106.043 79.4584Z" />
      <path d="M568.914 221.538H115.792C103.386 221.538 93.3431 230.991 92.1615 243.101L81.5277 371.594C77.3923 422.104 116.974 465.231 167.485 465.231H495.954C540.261 465.231 579.252 428.898 582.501 384.591L592.249 246.646C593.431 233.058 582.797 221.538 568.914 221.538Z" />
    </svg>
  );
};
export const Sun: React.FC<IconProps> = ({ customClass }) => {
  return (
    <svg
      className={classnames(styles["root"], customClass)}
      fill="currentColor"
      width="36"
      height="36"
      viewBox="0 0 576 576"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M288.137 471.497C389.404 471.497 471.497 389.404 471.497 288.137C471.497 186.87 389.404 104.777 288.137 104.777C186.87 104.777 104.777 186.87 104.777 288.137C104.777 389.404 186.87 471.497 288.137 471.497Z" />
      <path d="M288.137 575.226C273.73 575.226 261.943 564.487 261.943 550.08V547.984C261.943 533.578 273.73 521.79 288.137 521.79C302.544 521.79 314.331 533.578 314.331 547.984C314.331 562.391 302.544 575.226 288.137 575.226ZM475.164 501.359C468.354 501.359 461.805 498.739 456.566 493.762L453.161 490.357C442.945 480.141 442.945 463.639 453.161 453.423C463.377 443.207 479.879 443.207 490.095 453.423L493.5 456.828C503.716 467.044 503.716 483.546 493.5 493.762C488.523 498.739 481.975 501.359 475.164 501.359ZM101.11 501.359C94.2994 501.359 87.7508 498.739 82.512 493.762C72.2962 483.546 72.2962 467.044 82.512 456.828L85.9173 453.423C96.133 443.207 112.635 443.207 122.851 453.423C133.067 463.639 133.067 480.141 122.851 490.357L119.446 493.762C114.469 498.739 107.659 501.359 101.11 501.359ZM550.08 314.331H547.984C533.578 314.331 521.79 302.544 521.79 288.137C521.79 273.73 533.578 261.943 547.984 261.943C562.391 261.943 575.226 273.73 575.226 288.137C575.226 302.544 564.487 314.331 550.08 314.331ZM28.2898 314.331H26.1943C11.7874 314.331 0 302.544 0 288.137C0 273.73 11.7874 261.943 26.1943 261.943C40.6011 261.943 53.4363 273.73 53.4363 288.137C53.4363 302.544 42.6967 314.331 28.2898 314.331ZM471.759 130.709C464.949 130.709 458.4 128.09 453.161 123.113C442.945 112.897 442.945 96.395 453.161 86.1792L456.566 82.7739C466.782 72.5582 483.285 72.5582 493.5 82.7739C503.716 92.9897 503.716 109.492 493.5 119.708L490.095 123.113C485.118 128.09 478.57 130.709 471.759 130.709ZM104.515 130.709C97.7047 130.709 91.1561 128.09 85.9173 123.113L82.512 119.446C72.2962 109.23 72.2962 92.7278 82.512 82.512C92.7278 72.2962 109.23 72.2962 119.446 82.512L122.851 85.9173C133.067 96.133 133.067 112.635 122.851 122.851C117.874 128.09 111.064 130.709 104.515 130.709ZM288.137 53.4363C273.73 53.4363 261.943 42.6967 261.943 28.2898V26.1943C261.943 11.7874 273.73 0 288.137 0C302.544 0 314.331 11.7874 314.331 26.1943C314.331 40.6011 302.544 53.4363 288.137 53.4363Z" />
    </svg>
  );
};
export const Moon: React.FC<IconProps> = ({ customClass }) => {
  return (
    <svg
      className={classnames(styles["root"], customClass)}
      fill="currentColor"
      width="36"
      height="36"
      viewBox="0 0 576 594"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M570.559 413.418C565.811 405.404 552.455 392.939 519.214 398.875C500.812 402.14 482.114 403.624 463.416 402.733C394.263 399.765 331.639 368.008 288.01 319.037C249.427 276.002 225.684 219.907 225.387 159.361C225.387 125.526 231.916 92.8786 245.272 62.0119C258.331 32.0356 249.13 16.3055 242.601 9.77596C235.774 2.94967 219.748 -6.54777 188.288 6.51121C66.8989 57.56 -8.19023 179.246 0.713619 309.54C9.61747 432.116 95.688 536.885 209.657 576.358C236.962 585.856 265.751 591.495 295.43 592.682C300.179 592.979 304.928 593.276 309.676 593.276C409.103 593.276 502.296 546.382 561.062 466.544C580.947 438.942 575.605 421.431 570.559 413.418Z" />
    </svg>
  );
};

export const User: React.FC<IconProps> = ({ customClass }) => {
  return (
    <svg
      className={classnames(styles["root"], customClass)}
      fill="currentColor"
      width="36"
      height="36"
      viewBox="0 0 576 576"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M575.226 167.103V408.123C575.226 488.936 538.131 544.443 472.853 565.442C462.784 489.515 383.401 430.556 287.627 430.556C191.854 430.556 112.472 489.517 102.406 565.447C121.388 572.062 143.247 575.226 167.119 575.226H408.14C411.118 575.226 414.065 575.177 416.979 575.078C414.06 575.177 411.107 575.226 408.123 575.226H167.103C143.231 575.226 121.373 572.063 102.39 565.448C37.1021 544.452 0 488.942 0 408.123V167.103C0 62.4121 62.4121 0 167.103 0H408.123C512.814 0 575.226 62.4121 575.226 167.103ZM472.853 565.442L472.853 565.447C460.596 569.718 447.14 572.55 432.717 574.02C447.134 572.549 460.584 569.717 472.836 565.448L472.853 565.442ZM287.61 378.787C344.558 378.787 390.576 332.481 390.576 275.533C390.576 218.587 344.558 172.568 287.61 172.568C230.663 172.568 184.645 218.587 184.645 275.533C184.645 332.481 230.663 378.787 287.61 378.787Z"
      />
    </svg>
  );
};
