import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recommendedmovies } from './recommendedmovies';

describe('Recommendedmovies', () => {
  let component: Recommendedmovies;
  let fixture: ComponentFixture<Recommendedmovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recommendedmovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recommendedmovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
