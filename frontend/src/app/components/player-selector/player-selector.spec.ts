import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelector } from './player-selector';

describe('PlayerSelector', () => {
  let component: PlayerSelector;
  let fixture: ComponentFixture<PlayerSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
