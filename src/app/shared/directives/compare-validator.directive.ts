import { Directive } from '@angular/core';
import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

export function compareValidator(controlNameToCompare: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length === 0) {
      return null;
    }
    const controlToCompare = c.root.get(controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        subscription.unsubscribe();
      });
    }
    return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true } : null;

  };
}

@Directive({
  selector: '[compare]'
})
export class CompareValidatorDirective {

  constructor() { }

}