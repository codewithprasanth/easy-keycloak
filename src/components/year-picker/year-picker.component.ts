import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrl: './year-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: YearPickerComponent,
      multi: true,
    },
  ],
})
export class YearPickerComponent implements OnInit, ControlValueAccessor {
  disabled = false;

  writeValue(value: string[]): void {
    this.selectedYears = value ?? [];
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChanged!: (event: string[]) => void;
  onTouched!: () => void;

  @Input() placeholder = '';
  @Input({ required: true }) years: string[] = [];

  @Input() selectedYears: string[] = [];
  additional: number = 0;
  @Input() maxShow = 2;
  displayDropdown = false;

  @Output() onChange = new EventEmitter<string[]>();

  toggle(event: Event) {
    this.displayDropdown = !this.displayDropdown;
  }

  ngOnInit(): void {
    this.additional = this.selectedYears.length - this.maxShow;
  }
  toggleChip(year: string) {
    this.onTouched();
    if (this.selectedYears.includes(year)) {
      this.selectedYears = this.selectedYears
        .filter((y) => y !== year)
        .sort((a, b) => a.localeCompare(b));
    } else {
      this.selectedYears = [...this.selectedYears, year];
      this.selectedYears = this.selectedYears.sort((a, b) =>
        a.localeCompare(b)
      );
    }
    this.additional = this.selectedYears.length - this.maxShow;
    this.onChange.emit(this.selectedYears);
    this.onChanged(this.selectedYears);
  }
}
