import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        // const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[^\w\d\s]).{8,}$/.test(value);
        const passwordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).*$/.test(value);
        // const passwordValid = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[^\w\d\s]).{8,}$').test(value);
        // const passwordValid = new RegExp('((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$').test(value);

        return !passwordValid ? { weakPassword: true } : null;
    }
}