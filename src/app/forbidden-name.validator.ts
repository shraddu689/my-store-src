import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(restrictedName: RegExp): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        if(restrictedName.test(control.value)){
            return {forbidden:control.value};
        }
        else {
            return null;
        }
    }
}