import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'ag-info-icon-renderer',
  templateUrl: './ag-info-icon-renderer.component.html',
  styleUrl: './ag-info-icon-renderer.component.scss',
})
export class AgInfoIconRendererComponent implements IHeaderAngularComp {
  headerName = '';
  showInfoIcon = false;
  tooltip = '';
  agInit(params: { tooltip: string } & IHeaderParams<any, any>): void {
    this.headerName = params.column.getColDef().headerName as string;
    this.tooltip = params.tooltip;
    this.showInfoIcon = !!this.tooltip;
  }
  refresh(params: IHeaderParams): boolean {
    return true;
  }
}
