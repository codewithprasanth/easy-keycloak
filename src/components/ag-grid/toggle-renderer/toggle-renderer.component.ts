import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'toggle-renderer',
  templateUrl: './toggle-renderer.component.html',
  styleUrls: ['./toggle-renderer.component.scss'],
})
export class ToggleRendererComponent implements ICellRendererAngularComp {
  isSameUser = false;
  isDisabled = false;
  params: any;
  constructor(private authService: AuthService) {}
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.isDisabled = !!(params as any)?.disabled;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  onToggleChange(event: Event) {
    this.params.toggleChangeEvent(event, this.params);
  }
}
