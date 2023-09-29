import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsFilterComponent } from './transactions-filter.component';

describe('TransactionsFilterComponent', () => {
  let component: TransactionsFilterComponent;
  let fixture: ComponentFixture<TransactionsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsFilterComponent]
    });
    fixture = TestBed.createComponent(TransactionsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
