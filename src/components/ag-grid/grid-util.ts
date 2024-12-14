import { ColDef, GridOptions } from 'ag-grid-community';
import { AgTooltipComponent } from './ag-tooltip/ag-tooltip.component';
import { AgInfoIconRendererComponent } from './ag-info-icon-renderer/ag-info-icon-renderer.component';

const defaultColDef: ColDef = {
  filter: false,
  resizable: false,
  cellClass: 'no-border',
  suppressMovable: true,
  tooltipComponent: AgTooltipComponent,
  cellStyle: {
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    overflow: 'hidden',
    display: 'block',
  },
  flex: 1,
};

export const defaultGridOptions: GridOptions = {
  headerHeight: 50,
  rowHeight: 50,
  suppressCellFocus: true,
  suppressPaginationPanel: true,
  animateRows: true,
  pagination: true,
  overlayNoRowsTemplate: 'No records to display',
  icons: {
    sortAscending: '<img src="assets/icons/sort-asc.svg" />',
    sortDescending: '<img src="assets/icons/sort-des.svg" />',
    sortUnSort: '<img src="assets/icons/sort-none.svg" />',
  },
  tooltipShowDelay: 1000,
  // tooltipHideDelay: 3000,
  rowData: [],
  columnDefs: [],
  defaultColDef: defaultColDef,
  unSortIcon: true,
};
