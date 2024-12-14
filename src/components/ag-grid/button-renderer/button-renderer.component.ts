import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-renderer',

  templateUrl: './button-renderer.component.html',
  styleUrl: './button-renderer.component.scss',
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params: any;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }
  onClick() {
    this.params.clicked(this.params.data[this.params.field1]);
  }
}
