import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanNewComponent } from './loan-new.component';

describe('LoanNewComponent', () => {
  let component: LoanNewComponent;
  let fixture: ComponentFixture<LoanNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
