import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gdb-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ToggleComponent,
      multi: true,
    },
  ],
})
export class ToggleComponent implements ControlValueAccessor {
  value: boolean = false;
  @Input() isDisabled: boolean = false;

  @Output() onChange = new EventEmitter();

  change!: (event: boolean) => void;

  touched!: () => void;

  writeValue(obj: boolean): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.change = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onCheckboxChange(event: Event) {
    this.onChange.emit(event);
  }
}
