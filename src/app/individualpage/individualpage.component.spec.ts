import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualpageComponent } from './individualpage.component';

describe('IndividualpageComponent', () => {
  let component: IndividualpageComponent;
  let fixture: ComponentFixture<IndividualpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
