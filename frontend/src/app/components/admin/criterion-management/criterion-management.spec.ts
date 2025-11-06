import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionManagement } from './criterion-management';

describe('CriterionManagement', () => {
  let component: CriterionManagement;
  let fixture: ComponentFixture<CriterionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriterionManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriterionManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
