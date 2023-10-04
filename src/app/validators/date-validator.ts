import {FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

export function dateValidator(): Validators {
    return (form: FormGroup): ValidationErrors | null => {

        const firstDate = form.get("firstDate")?.value;
        
        const secondDate = form.get("secondDate")?.value;
        
        const now = new Date();

        if (firstDate && secondDate) {
            const newFirstDate = new Date(firstDate.year, firstDate.month - 1, firstDate.day);
            const newSecondDate = new Date(secondDate.year, secondDate.month - 1, secondDate.day);
            
            if (newFirstDate && newSecondDate) {
                const validRange = firstDate <= secondDate;
                const validDate = secondDate <= now

                return validDate && validRange ? null : { invalidDateRange: true };
            }
        }

        

        return null;
    }
}