import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproducttocartComponent } from './addproducttocart.component';

describe('AddproducttocartComponent', () => {
  let component: AddproducttocartComponent;
  let fixture: ComponentFixture<AddproducttocartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproducttocartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproducttocartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
