import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontinfoComponent } from './frontinfo.component';

describe('FrontinfoComponent', () => {
  let component: FrontinfoComponent;
  let fixture: ComponentFixture<FrontinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
