/* eslint-disable-next-line */
export interface RenderListProps {
  data: unknown[];
  listMapCallback(e: unknown, i: number, arr: unknown[]): JSX.Element;
}

export function RenderList({ data, listMapCallback }: RenderListProps) {
  return <>{data.map(listMapCallback)}</>;
}

export default RenderList;
