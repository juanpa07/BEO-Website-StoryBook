export interface PaginatorProperties {
    totalPages: number;
    currentPage: number;
    onSelectItem: Function;
    pagesToShow?: number;
  }