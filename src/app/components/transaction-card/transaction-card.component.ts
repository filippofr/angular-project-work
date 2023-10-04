import { Component, Input } from '@angular/core';
import { Transaction } from '../../interfaces/transaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css']
})
export class TransactionCardComponent {
  @Input()
  transaction!: Transaction;

  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(ModalDetailsComponent);
    modalRef.componentInstance.transaction = this.transaction;
  }
}
