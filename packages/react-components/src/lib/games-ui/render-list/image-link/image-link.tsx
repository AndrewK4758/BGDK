// import styles from './image-link.module.css';
import { SxProps } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { CSSProperties, ReactNode } from 'react';
import { Link, To } from 'react-router-dom';

export interface ImageLinkProps {
  type: string;
  to: To;
  id: string | number;
  srcSet: string | undefined;
  loading?: 'eager' | 'lazy' | undefined;
  alt: string;
  style: CSSProperties;
  title: ReactNode;
  position?: 'bottom' | 'top' | 'below' | undefined;
  breakpointsImageListText?: SxProps;
}

export function ImageLink({
  type,
  to,
  id,
  srcSet,
  loading,
  alt,
  style,
  title,
  position,
  breakpointsImageListText,
}: ImageLinkProps) {
  return (
    <ImageListItem key={id} sx={{ overflow: 'hidden' }}>
      <Link type={type} to={to}>
        <img srcSet={srcSet} loading={loading} alt={alt} style={style} />

        <ImageListItemBar title={title} position={position} sx={breakpointsImageListText} />
      </Link>
    </ImageListItem>
  );
}

export default ImageLink;
