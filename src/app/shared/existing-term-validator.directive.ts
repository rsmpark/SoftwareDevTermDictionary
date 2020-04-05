import { Directive, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { DataManagerService } from './data-manager.service';
import { EnglishTermApi, NonEnglishTermApi } from './model/term.model';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appExistingTerm][ngModel], [appExistingTerm][formControlName]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: ExistingTermValidator, multi: true },
  ],
})
export class ExistingTermValidator implements AsyncValidator {
  @Input() isTermEnglish = true;
  // TODO: getNonEnglishTermByWordExactMatch by languageCode
  @Input() languageCode = 'en';

  constructor(private dataManager: DataManagerService) {}

  validate(
    control: AbstractControl
  ): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
    return this.onSearchWord(control.value);
  }

  onSearchWord(termTarget) {
    // TODO: Do we have to encode the word before sending the Web API
    return new Promise((resolve, reject) => {
      if (this.isTermEnglish) {
        this.dataManager
          .getEnglishTermByWordExactMatch(termTarget)
          .subscribe((termsMatched: EnglishTermApi) => {
            if (Array.isArray(termsMatched) && termsMatched.length) {
              resolve({ existingTermFound: true });
            } else {
              resolve(null);
            }
          });
      } else {
        this.dataManager
          .getNonEnglishTermByWordExactMatch(termTarget)
          .subscribe((termsMatched: NonEnglishTermApi) => {
            if (Array.isArray(termsMatched) && termsMatched.length) {
              resolve({ existingTermFound: true });
            } else {
              resolve(null);
            }
          });
      }
    });
  }
}
