import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

export type TabOptionType = {
  name: string;
  id: number;
};

@Component({
  selector: 'gdb-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent implements OnChanges {
  @Input() options: TabOptionType[] = [
    {
      id: 1,
      name: 'Tab1',
    },
    {
      id: 2,
      name: 'Tab2',
    },
  ];
  @Input() selectedId: string | number = 1;
  @Output() onChanges = new EventEmitter<number>();
  @Input() sort = false;

  finalOptions: TabOptionType[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sort']?.currentValue) {
      this.finalOptions = this.options.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else {
      this.finalOptions = this.options;
    }
  }

  onclick(tabId: number) {
    if (this.selectedId !== tabId) {
      this.selectedId = tabId;
      this.onChanges.emit(tabId);
    }
  }
}
