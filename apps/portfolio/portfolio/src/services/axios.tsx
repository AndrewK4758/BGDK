import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = '*/*';
axios.defaults.headers.common['Content-Type'] = '*/*';
