import { Component, Input, Output, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from 'src/app/interfaces/transaction';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.css']
})
export class ModalDetailsComponent {
  @Input()
  transaction!: Transaction;

  constructor(public activeModal: NgbActiveModal) { }
}
