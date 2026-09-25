import React, { useState } from 'react';
import { APP_CONFIG } from '../../appConfig.js';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  alt: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  ...props
}) => {
  const defaultFallback = APP_CONFIG.images?.fallback || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop';
  const [imgSrc, setImgSrc] = useState<string>(src || defaultFallback);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc || defaultFallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-80'} transition-opacity duration-300`}
      loading="lazy"
      {...props}
    />
  );
};
