import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent {
  @Input() placeholder!: string;
  @Input() isVendorSearch!: boolean;
  @Input() inputLength!: number;
  @Input() autoSearch!: boolean;
  @Input() inputMaxLength!: number;
  @Input() inputType: string = 'text';
  @Output() onSearch = new EventEmitter<string>();

  min_max: string = 'minimum';
  enableSearch = true;
  searchValue = '';
  onType(searchString: string) {
    if (!this.inputLength) {
      this.inputLength = 4;
    }
    this.enableSearch = searchString.trim().length >= this.inputLength;
    if (searchString.length === 0 || searchString.length >= this.inputLength) {
      this.enableSearch = true;
      this.autoSearchFn(searchString);
      if (this.inputMaxLength && searchString.length > this.inputMaxLength) {
        this.enableSearch = false;
        this.min_max = 'maximum';
      }
    } else {
      this.enableSearch = false;
      this.min_max = 'minimum';
    }
  }
  autoSearchFn(searchString: string) {
    if (this.autoSearch && searchString.length == this.inputLength) {
      this.search(searchString);
    }
  }

  search(searchString: string) {
    if (this.enableSearch || searchString.length === 0) {
      searchString =
        searchString.length !== 0 && this.isVendorSearch
          ? '000' + searchString
          : searchString;
      this.onSearch.emit(searchString);
    }
  }

  getImgSrc() {
    if (this.enableSearch) {
      return 'assets/icons/search-enable.svg';
    } else {
      return 'assets/icons/search-disable.svg';
    }
  }
}
