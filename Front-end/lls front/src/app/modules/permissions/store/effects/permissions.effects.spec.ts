import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PermissionsEffects } from './permissions.effects';

describe('PermissionsEffects', () => {
  let actions$: Observable<any>;
  let effects: PermissionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PermissionsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PermissionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
