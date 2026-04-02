export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface TableBadge {
  label: string;
  variant: 'success' | 'error' | 'info' | 'warning' | 'primary';
}

export interface TableAction {
  icon: string;
  label: string;
  onClick?: (rowData: any, rowIndex: number) => void;
}

export interface TableRow {
  [key: string]: string | number | boolean | TableBadge | null | undefined;
}

export interface TableProperties {
  id: string;
  columns: TableColumn[];
  rows: TableRow[];
  actions?: TableAction[];
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  responsive?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: TableRow, index: number) => void;
}
