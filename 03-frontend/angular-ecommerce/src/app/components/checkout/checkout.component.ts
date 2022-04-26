import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { SportManShopFormService } from 'src/app/services/sport-man-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAdressStates: State[] = [];
  billingAdressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
                    private sportManShopFormService: SportManShopFormService  ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),

      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),

      billingAdress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),

      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    //remplir les mois actuelles
    const startMonth: number = new Date().getMonth() +1;
    console.log("Mois de départ:" + startMonth);

    this.sportManShopFormService.getCreditCardMonths(startMonth).subscribe(
      data =>{
        console.log("mois de la carte de credit:" +JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    //remplir les années actuelles
    this.sportManShopFormService.getCreditCardYears().subscribe(
      data =>{
        console.log("année de la carte de credit récupérée: "+ JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    //remplir les countries
    this.sportManShopFormService.getCountries().subscribe(
      data => {
        console.log("Recupereration de toutes les countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

  }

  // methode pour le checkout quand adresse livraison = adresse facturation
  copyShippingAdressToBillingAdress(event){
    if (event.target.checked){
      this.checkoutFormGroup.controls['billingAdress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      //bug fix for states
      this.billingAdressStates = this.shippingAdressStates;
    }
    else{
      this.checkoutFormGroup.controls['billingAdress'].reset();

      //bug fix for states
      this.billingAdressStates = [];
    }
  }

  onSubmit(){
    console.log("gérer le bouton submit");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log( "l'amail est: "+this.checkoutFormGroup.get('customer').value.email);

    console.log( "le pays de livraison est: "+this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log( "la region de livraison est: "+this.checkoutFormGroup.get('shippingAddress').value.state.name);

  }

  //methode qui gere  les mois et le sannées
  handleMonthsAndYears(){

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    //si l'annee est egale a l'année en cours, alors commercer avec le mois courrant
    let startMonth: number;

    if (currentYear === selectedYear){
      startMonth = new Date().getMonth() +1;
    }
    // sinon le choix des mois commence au prenimer mois de l'année future
    else{
      startMonth = 1;
    }

    this.sportManShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("mois de la carte recupérée:" +JSON.stringify(data))
        this.creditCardMonths = data;
      }
    );

  }

  //methode qui change le state 
  getStates(formGroupName: string){

    const formGroup = this.checkoutFormGroup.get(formGroupName);
    console.log("voici le formGroup " + formGroup);
    console.log("voici le formGroup " + formGroupName);


    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;
    const stateName = formGroup.value.state.name;


    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);
    console.log(`${formGroupName} state name: ${stateName}`);
    console.log('voici le countryCode'+countryCode);


    this.sportManShopFormService.getStates(countryCode).subscribe(
      data =>{
        //verifier si c'est l'adresse de livraison = de facturaiton, tu me donnes les données
        if(formGroupName === 'shippingAddress') {
          this.shippingAdressStates = data;

        }
        else{
          this.billingAdressStates = data;
        }

        //selecitonner le premier state par default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }
}
