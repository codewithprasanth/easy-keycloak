import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-ag-flag-override-renderer',
  templateUrl: './ag-flag-override-renderer.component.html',
  styleUrl: './ag-flag-override-renderer.component.scss',
})
export class AgFlagOverrideRendererComponent
  implements ICellRendererAngularComp
{
  params: any;
  showButtons = false;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.showButtons = params.value === false && !params.data.eudrFlag;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  push(changeToCompliant: boolean) {
    this.params.push(this.params.data.transactionId, changeToCompliant);
  }
}
