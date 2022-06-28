import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryWinComponent } from './lottery-win.component';

describe('LotteryWinComponent', () => {
  let component: LotteryWinComponent;
  let fixture: ComponentFixture<LotteryWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
