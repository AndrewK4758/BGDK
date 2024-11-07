// import { LoaderFunction, redirect } from 'react-router-dom';
// import axios from 'axios';

// const baseURL = import.meta.env.VITE_SERVER_URL_VERTEX;

// const loadPtyShell: LoaderFunction = async () => {
//   try {
//     const resp = await axios.post(`${baseURL}/start-pty-shell`);

//     const shellId = resp.headers['shell-id'];

//     sessionStorage.setItem('shellId', shellId);

//     return 'LLM loaded';
//   } catch (error) {
//     console.error(error);
//     return redirect('/gen-ai');
//   }
// };

// export default loadPtyShell;
