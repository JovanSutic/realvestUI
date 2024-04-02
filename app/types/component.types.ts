export type DropdownOptions = {
  value: string;
  text: string;
};

export type ColumnSizeType = 1 | 2 | 3 | 4 | 5;

export type ButtonSizeType = "small" | "medium" | "big";
export type ButtonVariantType = "primary" | "secondary" | "tertiary";

export type TableHeader = {
  key: string;
  name: string;
  sortable?: boolean;
  financial?: boolean;
  size?: boolean;
};
