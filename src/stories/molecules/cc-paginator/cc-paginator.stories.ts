import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import type { PaginatorProperties } from "@interfaces/paginator.interface";

import "./cc-paginator";

type PaginatorPropertiesArgs = Partial<PaginatorProperties>;

const meta: Meta<PaginatorPropertiesArgs> = {
  title: "Molecules/Paginator",
  component: "cc-paginator",
  tags: ["autodocs"],
  argTypes: {
    totalPages: { control: "number" },
    currentPage: { control: "number" },
    pagesToShow: { control: "number" },
    onSelectItem: {
      action: 'onSelectItem',
      control: false
    },
  },
};

export default meta;
type Story = StoryObj<PaginatorPropertiesArgs>;

const Template = (args: PaginatorPropertiesArgs) => html`
  <cc-paginator
    .totalPages=${args.totalPages}
    .currentPage=${args.currentPage}
    .pagesToShow=${args.pagesToShow}
    .onSelectItem=${args.onSelectItem}
  ></cc-paginator>
`;


export const PaginatorDefault: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
    pagesToShow: 9,
    onSelectItem: (page: number) => {
      // no-delete - temporal para debugging
      console.log('Página seleccionada:', page);
    },
  },
  render: Template,
};

