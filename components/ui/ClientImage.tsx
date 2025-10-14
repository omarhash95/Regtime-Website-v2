'use client';

import Image, { ImageProps } from 'next/image';

interface ClientImageProps extends ImageProps {
  onError?: () => void;
}

export default function ClientImage({ onError, ...props }: ClientImageProps) {
  return (
    <Image
      {...props}
      onError={onError}
    />
  );
}