import type { SxProps } from '@mui/material/styles';
import type { SyntheticEvent } from 'react';

export interface TitleProps {
  name: string;
  title: string;
  body: string;
  titleSx?: SxProps;
  bodySx?: SxProps;
}

export interface IFrameWithTitleProps extends TitleProps {
  url: string;
  scrollFunc: (e: SyntheticEvent<HTMLDivElement, Event>) => void;
}
