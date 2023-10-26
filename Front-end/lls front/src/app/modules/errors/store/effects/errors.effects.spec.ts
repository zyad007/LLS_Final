import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ErrorsEffects } from './errors.effects';

describe('ErrorsEffects', () => {
  let actions$: Observable<any>;
  let effects: ErrorsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ErrorsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
