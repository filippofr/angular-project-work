import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Filter } from 'src/app/interfaces/filter';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { dateValidator } from 'src/app/validators/date-validator';

@Component({
  selector: 'app-transactions-filter',
  templateUrl: './transactions-filter.component.html',
  styleUrls: ['./transactions-filter.component.css']
})
export class TransactionsFilterComponent {
  @Output()
  filters = new EventEmitter<Filter>();

  categoryList = this.bankAccSrv.listCategory();
  selectedCategoryId = '';

  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null;
	toDate: NgbDate | null;

  filterForm = this.fb.group({
    record: ['', {validators: Validators.min(1)}],
    category: ['Seleziona la categoria'],
		firstDate: [null],
		secondDate: [null]
	}, {
		validators: [dateValidator()]
	})

	constructor(private calendar: NgbCalendar,
              public formatter: NgbDateParserFormatter,
              private fb: FormBuilder,
              private bankAccSrv: BankAccountService) {
		this.fromDate = null//calendar.getNext(calendar.getToday(), 'd', -7);
		this.toDate = null//calendar.getToday();
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  onCategorySelected(value: string){
    this.selectedCategoryId = value;
  }

  sendFilters(){
    const f: Filter = {};
    if(this.filterForm.get('record')!.value){
      f.record = this.filterForm.get('record')!.value;
    }
    if(this.selectedCategoryId !== ''){
      f.category = this.selectedCategoryId;
    }
    if(this.fromDate && this.toDate){
      f.firstDate = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day);
      f.secondDate = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day);
		}
		console.log(this.filterForm.get('firstDate')?.value);
		console.log(this.filterForm.get('secondDate')?.value);

    this.filters.emit(f);
    
  }

	resetFilters(){
		this.filterForm.reset();
		this.fromDate = null;
		this.toDate = null;
		this.hoveredDate = null;
		this.selectedCategoryId = '';
	}
}
