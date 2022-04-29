import { FormControl, ValidationErrors } from "@angular/forms";

export class SportManValidators {

    //espace blanc validation
    static notOnlyWhitespace(control: FormControl) : ValidationErrors{

        //check si string contiens seulement des epaces blancs
        if ((control.value != null ) && (control.value.trim().length === 0)) {

            //invalid, return objet erreur
            return {'notOnlyWhitespace': true};
        }
        else{
            //valid, return null
            return null;
        }
        
    }
}
