import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gdb-checkbox',
  templateUrl: './gdb-checkbox.component.html',
  styleUrls: ['./gdb-checkbox.component.scss'],
})
export class GdbCheckboxComponent {
  @Input() label = 'sample text';
  @Input() value: string | number = 'sample value';
  @Input() name = 'sample group';
  @Output() onChange = new EventEmitter<any>();
  @Input() isChecked = false;
  @Input() isDisabled = false;

  change(event: Event) {
    this.onChange.emit(event);
  }
}
