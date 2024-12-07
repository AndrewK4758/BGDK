import type { SxProps } from '@mui/material/styles';
import Theme from './theme';

export const flexColumnStyles: SxProps = { display: 'flex', flexDirection: 'column' };
export const radioButtonLabelSxProps: SxProps = { display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' };
export const formLabelSxProps: SxProps = { alignContent: 'center', fontSize: '1.5rem' };
export const coloredTitleStyles: SxProps = { textAlign: 'center', color: Theme.palette.secondary.light };
