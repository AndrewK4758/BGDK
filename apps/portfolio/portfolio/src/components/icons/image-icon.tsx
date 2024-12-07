import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import type { SxProps } from '@mui/material/styles';

interface ImageIconProps {
  sx: SxProps;
}

const ImageIcon = ({ sx }: ImageIconProps) => <InsertPhotoOutlinedIcon sx={sx} />;

export default ImageIcon;
