import Image from 'next/image'
import React, { FC, memo, MouseEventHandler } from 'react'

interface PictureProps {
  src: string
  alt?: string
  className: string
  priority: boolean
  onClick?: MouseEventHandler<HTMLImageElement>
  width?: number
  height?: number
}

const Picture: FC<PictureProps> = ({ src, alt, className, priority = false, onClick, width, height }) => {
  return (
    <Image
      onClick={onClick}
      src={src || '/images/sqysh.png'}
      alt={alt || 'Rosie Paws'}
      width={width || '0'}
      height={height || '0'}
      className={className}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes="100vw"
      unoptimized
    />
  )
}

export default memo(Picture)
