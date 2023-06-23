import React from "react";

export interface ImageProps {
  alt: string;
  src: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }, props) => {
  return (
    <img
      className={className}
      style={{ objectFit: "cover" }}
      loading="lazy"
      {...props}
      src={src}
      alt={alt}
    />
  );
};
export default Image;
