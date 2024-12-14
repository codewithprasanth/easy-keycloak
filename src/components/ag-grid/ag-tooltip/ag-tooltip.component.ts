import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';

@Component({
  selector: 'ag-tooltip',
  templateUrl: './ag-tooltip.component.html',
  styleUrls: ['./ag-tooltip.component.scss'],
})
export class AgTooltipComponent implements ITooltipAngularComp {
  params!: ITooltipParams;

  agInit(params: ITooltipParams): void {
    this.params = params;
  }
}
