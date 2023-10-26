import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CompletedExperimentEffects } from './completed-experiment.effects';

describe('CompletedExperimentEffects', () => {
  let actions$: Observable<any>;
  let effects: CompletedExperimentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompletedExperimentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CompletedExperimentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
