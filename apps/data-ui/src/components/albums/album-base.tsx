// import { Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import { useRouteLoaderData, useSubmit } from 'react-router-dom';
// import { Box, Button, FormLabel, List, ListItem } from '@mui/material';
// import { Text } from '@bgdk/react-components';
// import { useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { album, track } from '@prisma/client';

// const initialValues = {
//   title: '',
// };

// type AlbumWithTracks = { album: album; tracks: track[] };

// const Album = () => {
//   const { state } = useLocation();
//   const submit = useSubmit();
//   const loader = useRouteLoaderData('artists') as [];
//   const [tracks, setTracks] = useState<track[] | undefined>(undefined);
//   const [tracksPendingSave, setTracksPendingSave] = useState<AlbumWithTracks[] | undefined>(undefined);

//   console.log(state.albumTitle);
//   const handleCheckAlbum = (albumTitle: string) => {
//     const albums = loader.filter((e: { artist_is: number; name: string; album: album }) => {
//       console.log(e);
//       if (e.album.title) {
//         const titles = Object.values(e.album.title);

//         console.log(titles);
//       }
//     });
//     // console.log(albums);
//     return albums as album[];
//   };

//   handleCheckAlbum(state.albumTitle);
//   const validationSchema = Yup.object().shape({
//     title: Yup.string().max(64).required('Artist name must not be empty and not already in the artist list'),
//   });

//   const getTracks = async () => {
//     const baseURL = import.meta.env.VITE_DATA_API_URL;
//     const album = state.albumID;
//     const resp = await axios.get(`${baseURL}/tracks?album=${album}`);

//     setTracks(resp.data);
//   };

//   useEffect(() => {
//     if (tracks === undefined) {
//       getTracks();
//     }
//   });

//   const Tracks = () => {
//     if (tracks !== undefined) {
//       return (
//         <Box sx={{ flex: '1 0 100%', height: 'fit-content' }}>
//           <FormLabel sx={{ fontSize: '22px', fontWeight: 'bold' }}>{'Details'}</FormLabel>
//           <List key={'track-list'}>
//             <ListItem key={state.artistName} sx={{ fontSize: '18px', fontWeight: 'bold' }}>
//               {`Artist: ${state.artistName}`}
//             </ListItem>
//             <ListItem key={state.albumTitle} sx={{ fontSize: '18px', fontWeight: 'bold' }}>
//               {`Album: ${state.albumTitle}`}
//             </ListItem>
//             <ListItem key={'tracks'} sx={{ fontSize: '18px', fontWeight: 'bold' }}>
//               {'Tracks:'}
//             </ListItem>
//             {tracks.map(track => (
//               <ListItem key={track.name}>{track.name}</ListItem>
//             ))}
//           </List>
//         </Box>
//       );
//     } else return undefined;
//   };

//   return (
//     <Box sx={{ display: 'flex', width: '100%' }}>
//       <Box
//         sx={{
//           flex: '1 0 50%',
//           borderRight: '5px solid black',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           height: '100%',
//         }}
//       >
//         <Box sx={{ flex: '1 0 50%' }}>
//           <Tracks />
//         </Box>
//       </Box>
//       <Box sx={{ flex: '1 0 50%', display: 'flex', justifyContent: 'center' }}>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={values => submit(values, { action: 'album', encType: 'application/json', method: 'POST' })}
//         >
//           {formik => (
//             <Form action="album" method="post">
//               <FormLabel sx={{ fontSize: '22px', fontWeight: 'bold' }}>
//                 Album Title
//                 <br />
//                 <Field name="title" placeholder={'Enter Album Title'} as="input" />
//                 {formik.touched.title && formik.errors.title && (
//                   <Text titleVariant="body1" titleText={formik.errors.title} />
//                 )}
//               </FormLabel>

//               <br />
//               <Button variant="outlined" type="submit">
//                 Submit
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </Box>
//     </Box>
//   );
// };

// export default Album;
