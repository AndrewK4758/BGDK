import { Button, Container, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Layout = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  return (
    <>
      <Box key={'header'} component={'header'}>
        <Paper elevation={12} sx={{ position: 'fixed', left: 0, right: 0, top: 0, height: '80px', display: 'flex' }}>
          <Box sx={{ flex: '1 0 100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Button type="button" variant="contained" onClick={() => nav('artist')}>
              Artist
            </Button>
            <Button type="button" variant="contained" onClick={() => nav('album')}>
              Album
            </Button>
          </Box>
        </Paper>
      </Box>
      <Container key={'main'} component={'main'} sx={{ position: 'relative', top: 80, paddingTop: '25px' }}>
        {pathname === '/' && (
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            CLICK ON ARTIST OR ALBUM TO SEARCH OR ADD ENTRIES
          </Typography>
        )}
        <Outlet />
      </Container>
      <Box key={'footer'} component={'footer'}></Box>
    </>
  );
};

export default Layout;

// import { useState, SyntheticEvent } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Artist from '../components/artists/artist-base';
// import Album from '../components/albums/album-base';

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// const Layout = () => {
//   const [value, setValue] = useState(0);

//   const handleChange = (event: SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab label="Artist" {...a11yProps(0)} />
//           <Tab label="Album" {...a11yProps(1)} />
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         <Artist />
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         <Album />
//       </CustomTabPanel>
//     </Box>
//   );
// };

// export default Layout;
