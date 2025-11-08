
import React, { useState } from 'react';
import { StoveIcon } from './icons';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`${className} bg-line-light flex items-center justify-center`}>
        <StoveIcon className="w-1/2 h-1/2 text-line-dark" />
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={handleError} />;
};

export default ImageWithFallback;
