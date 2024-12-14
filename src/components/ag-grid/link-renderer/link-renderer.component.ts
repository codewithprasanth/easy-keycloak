import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-link-renderer',
  templateUrl: './link-renderer.component.html',
  styleUrls: ['./link-renderer.component.scss'],
})
export class LinkRendererComponent implements ICellRendererAngularComp {
  params: any;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }
  onClick() {
    this.params.clicked(this.params.data[this.params.field1], this.params.data[this.params.field2]);
  }
}
