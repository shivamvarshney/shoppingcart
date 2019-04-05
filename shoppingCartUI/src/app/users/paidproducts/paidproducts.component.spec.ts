import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidproductsComponent } from './paidproducts.component';

describe('PaidproductsComponent', () => {
  let component: PaidproductsComponent;
  let fixture: ComponentFixture<PaidproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
