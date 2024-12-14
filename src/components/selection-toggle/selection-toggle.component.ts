import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'selection-toggle',
  templateUrl: './selection-toggle.component.html',
  styleUrls: ['./selection-toggle.component.scss'],
})
export class SelectionToggleComponent implements OnInit {
  selected: string = '';
  @Input() option1 = 'option1';
  @Input() option2 = 'option2';
  @Input() default = this.option1;
  @Output() onChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.selected = this.default;
  }
  select(option: string) {
    this.selected = option;
    this.onChange.emit(option);
  }
}
