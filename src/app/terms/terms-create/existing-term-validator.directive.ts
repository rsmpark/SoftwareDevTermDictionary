import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
  NG_ASYNC_VALIDATORS
} from '@angular/forms';
import { DataManagerService } from '../../shared/data-manager.service';
import { EnglishTermApi } from '../../shared/model/term.model';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appExistingTerm][ngModel], [appExistingTerm][formControlName]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: ExistingTermValidator, multi: true }
  ]
})
export class ExistingTermValidator implements AsyncValidator {
  constructor(private dataManager: DataManagerService) {}

  validate(
    control: AbstractControl
  ): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
    return this.onSearchWord(control.value);
  }

  onSearchWord(termTarget) {
    // TODO: Do we have to encode the word before sending the Web API
    return new Promise((resolve, reject) => {
      this.dataManager
        .getEnglishTermByWordExactMatch(termTarget)
        .subscribe((termsMatched: EnglishTermApi) => {
          if (Array.isArray(termsMatched) && termsMatched.length) {
            resolve({ existingTermFound: true });
          } else {
            resolve(null);
          }
        });
    });
  }
}
