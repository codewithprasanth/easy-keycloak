import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'aggrid-compliance-renderer',
  templateUrl: './complaince-renderer.component.html',
  styleUrl: './compliance-renderer.component.scss',
})
export class ComplianceRendererComponent implements ICellRendererAngularComp {
  imageSrc: string = '';
  params: any;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    if (params.value) {
      this.imageSrc = 'assets/icons/greenTick.svg';
    } else {
      this.imageSrc = 'assets/icons/alert-red.svg';
    }
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }
}
