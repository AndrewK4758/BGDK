import { SxProps } from '@mui/material';
import { FormMethod } from 'react-router-dom';

export type httpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface FormActionProps {
  method: FormMethod | httpMethod;
  action?: string;
  handleSubmit?: () => unknown;
  names: string[];
  value?: string | number | readonly string[] | undefined;
  type: 'text' | 'file';
  variant: 'outlined' | 'text' | 'contained';
  sx?: SxProps;
  buttonText: string;
  buttonType: 'button' | 'submit' | undefined;
}
