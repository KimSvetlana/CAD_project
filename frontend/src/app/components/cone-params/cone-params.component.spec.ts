import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConeParamsComponent } from './cone-params.component';

describe('ConePAramsComponent', () => {
  let component: ConeParamsComponent;
  let fixture: ComponentFixture<ConeParamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConeParamsComponent]
    });
    fixture = TestBed.createComponent(ConeParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
