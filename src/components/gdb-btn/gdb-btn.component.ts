import { Component, Input } from '@angular/core';

@Component({
  selector: 'gdb-btn',
  templateUrl: './gdb-btn.component.html',
  styleUrls: ['./gdb-btn.component.scss'],
})
export class GdbBtnComponent {
  @Input() type: string = 'primary';
  @Input() isDisabled: boolean = false;
  @Input() iconUrl: string = '';
  @Input() text: string = '';
}
