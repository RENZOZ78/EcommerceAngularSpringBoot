import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OderHistoryComponent } from './oder-history.component';

describe('OderHistoryComponent', () => {
  let component: OderHistoryComponent;
  let fixture: ComponentFixture<OderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OderHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
