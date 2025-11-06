import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRandomizer } from './game-randomizer';

describe('GameRandomizer', () => {
  let component: GameRandomizer;
  let fixture: ComponentFixture<GameRandomizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRandomizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRandomizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
