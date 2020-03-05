import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as specificationsSelectors from '../state/specifications/specifications.selectors';
import { map, debounceTime, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SpecNameValidator {
    constructor(private store: Store<any>) { }

    existingSpecNameValidator(): AsyncValidatorFn {
        return (
            control: AbstractControl
        ):
            Observable<ValidationErrors | null> => {
            return this.store.select(specificationsSelectors.hasExistingSpecification, { specName: control.value }).pipe(
                // debounceTime(200), // Only needed if performance is an issue
                take(1),
                map(hasExistingSpecification => hasExistingSpecification ? { existingSpecName: control.value } : null)
            );
        };
    }
}
