import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'selection-checkbox',
  templateUrl: './selection-checkbox.component.html',
  styleUrls: ['./selection-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectionCheckboxComponent,
      multi: true,
    },
  ],
})
export class SelectionCheckboxComponent implements ControlValueAccessor {
  @Input() label = 'sample text';
  @Input() value: string | number = 'sample value';
  @Input() name = 'sample group';
  isChecked = false;
  isDisabled = false;

  onChange!: (event: boolean) => void;
  onTouched!: () => void;

  writeValue(obj: boolean): void {
    this.isChecked = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
