/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from "react";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  style?: React.CSSProperties;
};

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  placeholderSrc = "/logo.png",
  style = {},
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsInView(true);
        });
      },
      { threshold: 0.1 }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ ...style, width: "100%", height: "100%" }}
      ref={imgRef as React.Ref<HTMLDivElement> | undefined}
    >
      {!isLoaded && (
        <img
          src={placeholderSrc || src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover blur-md scale-105 transition-all duration-500"
          style={{
            filter: "blur(16px)",
            transition: "opacity 0.5s",
            objectFit: "cover",
          }}
          aria-hidden="true"
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
};

export default LazyImage;
