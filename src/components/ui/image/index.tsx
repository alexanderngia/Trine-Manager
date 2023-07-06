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
      srcSet={`${src} 50w,
      ${src} 320w,
      ${src} 768w,
      ${src} 1200w`}
      sizes="30vw"
      alt={alt}
    />
  );
};
export default Image;
