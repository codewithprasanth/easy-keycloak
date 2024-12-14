import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'ag-action-buttons-renderer',
  templateUrl: './ag-action-buttons-renderer.component.html',
  styleUrl: './ag-action-buttons-renderer.component.scss',
})
export class AgActionButtonsRendererComponent
  implements ICellRendererAngularComp
{
  data!: {
    status: string;
    deleteFlag: boolean;
    id: number;
    transactionId: string;
    errorMessage: { [key: string]: string };
    fileType: string;
  };
  params!: any;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.data = params.data;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  onExecute() {
    this.params.onExecute(
      this.data.id,
      this.data.fileType.toLowerCase().includes('geo')
    );
  }

  onDelete() {
    this.params.onDelete(
      this.data.id,
      this.data.fileType.toLowerCase().includes('geo')
    );
  }

  onViewDetails() {
    this.params.onViewDetails(this.data.transactionId);
  }

  onViewError() {
    this.params.onViewError(this.data.errorMessage);
  }
}
