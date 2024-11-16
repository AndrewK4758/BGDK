export const getContextId = (name: string): string | null => sessionStorage.getItem(name);

export default getContextId;
