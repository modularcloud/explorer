import { Entity } from "service-manager/types/entity.type";

interface Props$2 {
  primary?: boolean;
  size?: "small" | "large";
  label?: string;
}
declare const Button: ({ primary, label, size }: Props$2) => JSX.Element;

type Props$1 = {
  data: Entity[];
  onRowClick: (row: Entity) => void;
};
declare function Table({ data, onRowClick }: Props$1): JSX.Element;

interface Props {
  value: string;
}
declare const BoxedValue: ({ value }: Props) => JSX.Element;

export { BoxedValue, Button, Table };
