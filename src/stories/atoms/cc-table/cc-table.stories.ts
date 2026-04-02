import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './cc-table';

import type { TableProperties, TableRow, TableBadge } from '@interfaces/table.interface';

type TableArgs = Partial<TableProperties>;

const meta: Meta<TableArgs> = {
  title: 'Atoms/Table',
  component: 'cc-table',
  tags: ['autodocs'],

  argTypes: {
    id: {
      control: 'text',
      description: 'Element ID',
    },
    columns: {
      control: 'object',
      description: 'Array of column definitions',
    },
    rows: {
      control: 'object',
      description: 'Array of row data',
    },
    actions: {
      control: 'object',
      description: 'Array of action buttons',
    },
    striped: {
      control: 'boolean',
      description: 'Enable striped rows',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effect on rows',
    },
    bordered: {
      control: 'boolean',
      description: 'Add borders to table',
    },
    compact: {
      control: 'boolean',
      description: 'Use compact spacing',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive overflow',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message when table is empty',
    },
  },

  parameters: {
    docs: {
      description: {
        component:
          'A flexible table component that accepts JSON data for headers and values. Supports actions, badges, and various styling options.',
      },
      source: {
        type: 'dynamic',
        language: 'html',
      },
    },
  },

  render: (args) => html`
    <cc-table
      .id=${args.id ?? 'data-table'}
      .columns=${args.columns ?? []}
      .rows=${args.rows ?? []}
      .actions=${args.actions}
      .striped=${args.striped ?? false}
      .hoverable=${args.hoverable ?? true}
      .bordered=${args.bordered ?? false}
      .compact=${args.compact ?? false}
      .responsive=${args.responsive ?? true}
      .emptyMessage=${args.emptyMessage ?? 'No data available'}
    ></cc-table>
  `,
};

export default meta;
type Story = StoryObj<TableArgs>;

// ============================
// Sample data
// ============================

const sampleColumns = [
  { key: 'name', label: 'Name', align: 'left' as const },
  { key: 'email', label: 'Email', align: 'left' as const },
  { key: 'status', label: 'Status', align: 'left' as const },
  { key: 'date', label: 'Date', align: 'left' as const },
];

const sampleRows: TableRow[] = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    status: { label: 'Professional', variant: 'success' } as TableBadge,
    date: 'March 1, 2024',
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    status: { label: 'Rejected', variant: 'error' } as TableBadge,
    date: 'March 2, 2024',
  },
  {
    name: 'Alice Johnson',
    email: 'alicejohnson@example.com',
    status: { label: 'Applied', variant: 'info' } as TableBadge,
    date: 'March 3, 2024',
  },
  {
    name: 'Bob Brown',
    email: 'bobrown@example.com',
    status: { label: 'Current', variant: 'primary' } as TableBadge,
    date: 'March 4, 2024',
  },
];

const sampleActions = [
  {
    icon: 'edit',
    label: 'Edit',
    onClick: (row: TableRow, index: number) => {
      console.log('Edit clicked', row, index);
    },
  },
  {
    icon: 'delete',
    label: 'Delete',
    onClick: (row: TableRow, index: number) => {
      console.log('Delete clicked', row, index);
    },
  },
];

// ============================
// Stories
// ============================

export const Default: Story = {
  args: {
    id: 'default-table',
    columns: sampleColumns,
    rows: sampleRows,
    actions: sampleActions,
    hoverable: true,
    responsive: true,
  },
};

export const Striped: Story = {
  args: {
    id: 'striped-table',
    columns: sampleColumns,
    rows: sampleRows,
    actions: sampleActions,
    striped: true,
    hoverable: true,
  },
};

export const Bordered: Story = {
  args: {
    id: 'bordered-table',
    columns: sampleColumns,
    rows: sampleRows,
    actions: sampleActions,
    bordered: true,
    hoverable: true,
  },
};

export const Compact: Story = {
  args: {
    id: 'compact-table',
    columns: sampleColumns,
    rows: sampleRows,
    actions: sampleActions,
    compact: true,
    hoverable: true,
  },
};

export const WithoutActions: Story = {
  args: {
    id: 'no-actions-table',
    columns: sampleColumns,
    rows: sampleRows,
    hoverable: true,
  },
};

export const NotHoverable: Story = {
  args: {
    id: 'not-hoverable-table',
    columns: sampleColumns,
    rows: sampleRows,
    actions: sampleActions,
    hoverable: false,
  },
};

export const Empty: Story = {
  args: {
    id: 'empty-table',
    columns: sampleColumns,
    rows: [],
    emptyMessage: 'No users found',
  },
};

export const CustomColumns: Story = {
  args: {
    id: 'custom-columns-table',
    columns: [
      { key: 'id', label: 'ID', align: 'center' as const, width: '80px' },
      { key: 'product', label: 'Product', align: 'left' as const },
      { key: 'price', label: 'Price', align: 'right' as const },
      { key: 'stock', label: 'Stock', align: 'center' as const },
      { key: 'status', label: 'Status', align: 'center' as const },
    ],
    rows: [
      {
        id: '001',
        product: 'Laptop Pro 15"',
        price: '$1,299.00',
        stock: '45',
        status: { label: 'In Stock', variant: 'success' } as TableBadge,
      },
      {
        id: '002',
        product: 'Wireless Mouse',
        price: '$29.99',
        stock: '120',
        status: { label: 'In Stock', variant: 'success' } as TableBadge,
      },
      {
        id: '003',
        product: 'USB-C Hub',
        price: '$49.99',
        stock: '0',
        status: { label: 'Out of Stock', variant: 'error' } as TableBadge,
      },
      {
        id: '004',
        product: 'Mechanical Keyboard',
        price: '$159.99',
        stock: '8',
        status: { label: 'Low Stock', variant: 'warning' } as TableBadge,
      },
    ],
    actions: [
      { icon: 'eye', label: 'View' },
      { icon: 'pencil', label: 'Edit' },
    ],
    hoverable: true,
  },
};

export const AllBadgeVariants: Story = {
  args: {
    id: 'badge-variants-table',
    columns: [
      { key: 'name', label: 'Status Name', align: 'left' as const },
      { key: 'badge', label: 'Badge', align: 'left' as const },
      { key: 'description', label: 'Description', align: 'left' as const },
    ],
    rows: [
      {
        name: 'Success',
        badge: { label: 'Active', variant: 'success' } as TableBadge,
        description: 'Everything is working correctly',
      },
      {
        name: 'Error',
        badge: { label: 'Failed', variant: 'error' } as TableBadge,
        description: 'Something went wrong',
      },
      {
        name: 'Info',
        badge: { label: 'Pending', variant: 'info' } as TableBadge,
        description: 'Waiting for action',
      },
      {
        name: 'Warning',
        badge: { label: 'Attention', variant: 'warning' } as TableBadge,
        description: 'Requires attention',
      },
      {
        name: 'Primary',
        badge: { label: 'Featured', variant: 'primary' } as TableBadge,
        description: 'Highlighted item',
      },
    ],
    hoverable: true,
  },
};

export const LargeDataset: Story = {
  args: {
    id: 'large-dataset-table',
    columns: [
      { key: 'id', label: 'ID', align: 'center' as const },
      { key: 'name', label: 'Name', align: 'left' as const },
      { key: 'email', label: 'Email', align: 'left' as const },
      { key: 'role', label: 'Role', align: 'left' as const },
      { key: 'status', label: 'Status', align: 'center' as const },
    ],
    rows: Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1).padStart(3, '0'),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Editor', 'Viewer'][i % 3],
      status: {
        label: ['Active', 'Inactive', 'Pending'][i % 3],
        variant: (['success', 'error', 'info'] as const)[i % 3],
      } as TableBadge,
    })),
    actions: sampleActions,
    striped: true,
    hoverable: true,
    compact: true,
  },
};

export const FullFeatured: Story = {
  args: {
    id: 'full-featured-table',
    columns: sampleColumns,
    rows: sampleRows,
    actions: sampleActions,
    striped: true,
    hoverable: true,
    bordered: true,
    responsive: true,
  },
};

export const Interactive: Story = {
  render: () => html`
    <div>
      <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 600;">
        Interactive Table Example
      </h3>
      <p style="margin-bottom: 16px; color: #666;">
        Click on rows or action buttons to see events in action.
      </p>
      <cc-table
        id="interactive-table"
        .columns=${sampleColumns}
        .rows=${sampleRows}
        .actions=${sampleActions}
        .striped=${true}
        .hoverable=${true}
        @row-click=${(e: CustomEvent) => alert(`Row clicked: ${e.detail.row.name}`)}
        @action-click=${(e: CustomEvent) => alert(`Action "${e.detail.action.label}" clicked for ${e.detail.row.name}`)}
      ></cc-table>
    </div>
  `,
};
