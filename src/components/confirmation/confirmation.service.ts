import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from './confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private modalService: NgbModal) {}

  public confirm(
    title: string,
    message: string,
    showAction = true,
    messageArray: { [key: string]: string } = {},
    btnOkText: string = 'Yes',
    btnCancelText: string = 'No',
    target: string = ''
  ): Promise<boolean> {
    console.log(messageArray);
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'sm',
      centered: true,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.messageArray = messageArray;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.target = target;
    modalRef.componentInstance.showActions = showAction;
    modalRef.componentInstance.message = message;
    return modalRef.result;
  }
}
