import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export function Footer() {
  return (
    <Paper component={'footer'}>
      <Typography variant={'h3'}>&copy; A.Klapper {new Date().getFullYear()}</Typography>
    </Paper>
  );
}

export default Footer;
