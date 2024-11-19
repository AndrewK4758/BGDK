export const getContextPath = (name: string): string | null => sessionStorage.getItem(name);

export default getContextPath;
