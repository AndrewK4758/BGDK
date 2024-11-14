export const getCookie = (name: string, source: string) => {
  const cookies = source.split('; ').find(row => row.startsWith(`${name}=`));

  console.log(cookies);
  return cookies ? cookies.split('=')[1] : null;
};

export default getCookie;
