import { SxProps } from '@mui/material';

export type httpMethod = 'get' | 'options' | 'post' | 'put' | 'patch' | 'delete' | 'undefined';

export interface FormActionProps {
  method: httpMethod;
  action: string | undefined;
  handleSubmit?: () => unknown;
  name: string;
  value?: string | number | readonly string[] | undefined;
  type: 'text' | 'file';
  variant: 'outlined' | 'text' | 'contained';
  sx?: SxProps;
  buttonText: string;
  buttonType: 'button' | 'submit' | undefined;
}
