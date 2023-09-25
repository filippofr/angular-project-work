import {FormGroup, ValidationErrors, Validators} from '@angular/forms';

export function confPassValidator(): Validators {
    return (form: FormGroup): ValidationErrors | null => {

        const pass = form.get("password")?.value;
        const confPass = form.get("confPassword")?.value;

        if(confPass) {
            const validate = pass == confPass;
            return validate ? null : {passwordMissmatch:true}
        }

        return null;
    }
}