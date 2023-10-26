import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthToolEffects } from './auth-tool.effects';

describe('AuthToolEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthToolEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthToolEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AuthToolEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
