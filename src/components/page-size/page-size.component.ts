import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss'],
})
export class PageSizeComponent {
  @Input() currentPage = 1;
  @Input() pageSize = 20;
  itemsPerPageOptions = [10, 20, 50, 100];
  @Input() totalItems = 100;

  @Output() pageSizeChange = new EventEmitter<number>();

  onPageSizeChange() {
    this.pageSizeChange.emit(this.pageSize);
  }

  getMin(num1: number, num2: number) {
    return Math.min(num1, num2);
  }
}
