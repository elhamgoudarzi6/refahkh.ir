import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryMrsComponent } from './lottery-mrs.component';

describe('LotteryMrsComponent', () => {
  let component: LotteryMrsComponent;
  let fixture: ComponentFixture<LotteryMrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryMrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryMrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
