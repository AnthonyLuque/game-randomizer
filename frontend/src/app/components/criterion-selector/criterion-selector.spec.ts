import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionSelectorComponent } from './criterion-selector';

describe('CriterionSelector', () => {
  let component: CriterionSelectorComponent;
  let fixture: ComponentFixture<CriterionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriterionSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriterionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
