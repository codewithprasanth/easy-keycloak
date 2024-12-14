import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  @Input() title?: string;
  @Input() messageArray?: { [key: string]: string };
  @Input() message?: string;
  @Input() btnOkText: string = '';
  @Input() btnCancelText: string = '';
  @Input() target?: string;
  @Input() showActions? = true;

  constructor(private activeModal: NgbActiveModal) {}

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  getErrorList() {
    if (!this.messageArray) return [];
    return Object.entries(this.messageArray);
  }
}
