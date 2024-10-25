export interface RenderListProps {
  data: unknown[];
  listMapCallback(e: unknown, i: number, arr: unknown[]): JSX.Element;
}

export const RenderList = ({ data, listMapCallback }: RenderListProps) => <>{data.map(listMapCallback)}</>;
