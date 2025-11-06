import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectorComponent } from './player-selector';

describe('PlayerSelector', () => {
  let component: PlayerSelectorComponent;
  let fixture: ComponentFixture<PlayerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
