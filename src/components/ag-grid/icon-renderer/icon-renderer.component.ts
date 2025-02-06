import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-icon-renderer',

  templateUrl: './icon-renderer.component.html',
  styleUrl: './icon-renderer.component.scss',
})
export class IconRendererComponent implements ICellRendererAngularComp {
  params: any;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }
  onClick() {
    this.params.clicked(
      this.params.data[this.params.field1],
      this.params.data[this.params.field2]
    );
  }
}
