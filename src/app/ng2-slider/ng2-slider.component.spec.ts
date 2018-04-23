import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2SliderComponent } from './ng2-slider.component';

describe('Ng2SliderComponent', () => {
  let component: Ng2SliderComponent;
  let fixture: ComponentFixture<Ng2SliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2SliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
