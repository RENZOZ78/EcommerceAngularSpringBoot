import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SportManShopFormService } from 'src/app/services/sport-man-shop-form.service';
import { SportManValidators } from 'src/app/validators/sport-man-validators';

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

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  //session de stockage navigateur
  storage: Storage = sessionStorage;

  constructor(private formBuilder: FormBuilder,
              private sportManShopFormService: SportManShopFormService  ,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router ) { }

  ngOnInit(): void {

    this.reviewCartDetails();

    //lire l'email de l'user a aprtir du stockage navigateur
    const theEmail= JSON.parse(this.storage.getItem('userEmail'));

    this.checkoutFormGroup = this.formBuilder.group({

      //regles pour le formulaire de controle
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                                      [Validators.required, 
                                        Validators.minLength(2),
                                        SportManValidators.notOnlyWhitespace ]),

        lastName: new FormControl('', [Validators.required, 
                                        Validators.minLength(2),
                                        SportManValidators.notOnlyWhitespace]),

         //the Email est la valeur initiale
        email: new FormControl(theEmail,
                                [Validators.required, 
                                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
        //regles pour le formulaire de livraison
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, 
                                    Validators.minLength(2),
                                    SportManValidators.notOnlyWhitespace]),

        city: new FormControl('', [Validators.required, 
                                    Validators.minLength(2),
                                    SportManValidators.notOnlyWhitespace]),

        state: new FormControl('', [Validators.required]),

        country: new FormControl('', [Validators.required]),

        zipCode: new FormControl('', [Validators.required, 
                                      Validators.minLength(5),
                                      SportManValidators.notOnlyWhitespace]),
      }),
        //regle pour le formulaire  d'adresse de facturation
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, 
                                    Validators.minLength(2),
                                    SportManValidators.notOnlyWhitespace]),

        city: new FormControl('', [Validators.required, 
                                  Validators.minLength(2),
                                  SportManValidators.notOnlyWhitespace]),

        state: new FormControl('', [Validators.required]),

        country: new FormControl('', [Validators.required]),

        zipCode: new FormControl('', [Validators.required, 
                                      Validators.minLength(5),
                                      SportManValidators.notOnlyWhitespace]),
      }),
        //regle pour le formulaire de carte de credirtt
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),

        nameOnCard: new FormControl('', [Validators.required, 
                                         Validators.minLength(2),
                                          SportManValidators.notOnlyWhitespace]),
                                          
        cardNumber: new FormControl('', [Validators.required, 
                                         Validators.pattern('[0-9]{16}')]),          

        securityCode: new FormControl('', [Validators.required, 
          Validators.pattern('[0-9]{3}')]),

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
  reviewCartDetails() {
    
    //subscribe a cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    //subscribe a cartSerivce.totalPrice
      this.cartService.totalPrice.subscribe(
        totalPrice => this.totalPrice = totalPrice
      );
  }

//methode getter qui permettent d'acceder aux  champs de formulaires

  //formulaire infos client
  get firstName() {return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() {return this.checkoutFormGroup.get('customer.lastName'); }
  get email() {return this.checkoutFormGroup.get('customer.email'); }

    //formulaire de livriason
  get shippingAddressStreet() {return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() {return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() {return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() {return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  get shippingAddressCountry() {return this.checkoutFormGroup.get('shippingAddress.country'); }

  //formulaire de facturation
  get billingAddressStreet() {return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() {return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() {return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() {return this.checkoutFormGroup.get('billingAddress.zipCode');}
  get billingAddressCountry() {return this.checkoutFormGroup.get('billingAddress.country'); }

  //formulaire de carte de credit
  get creditCardType() {return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() {return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() {return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() {return this.checkoutFormGroup.get('creditCard.securityCode'); }





  // methode pour le checkout quand Addresse livraison = Addresse facturation
  copyShippingAddressToBillingAddress(event){
    if (event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      //bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();

      //bug fix for states
      this.billingAddressStates = [];
    }
  }

  // methode qui gere les evenements quand on clic sur submit
  onSubmit(){
    console.log("gérer le bouton submit");

    //methode qui check le status de la validation quand on appuis lsur le bouton submit  du formulaire
    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    //organiser la commande
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //recuper le sitems cart
    const cartItems = this.cartService.cartItems;

    //creer orderItems a partir de cartItems
      //methode longue
      // let orderItems: OrderItem[]=[];
      // for(let i=0; cartItems.length; i++){
      //   orderItems[i] = new OrderItem(cartItems[i]);
      // }

      //methode courte
      let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    //lancer l'achat (purchase)=creer une instance de purchase
    let purchase = new Purchase();
    

    //remplir client-purchase
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // remplir adresse de livraison purchase
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;


    //remplir adresse de facturation purchase
    purchase.billingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state =billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // remplir purchase order et orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    //appeler REST API a partir des données qu'on a collecté, via CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response =>{
          alert(`Votre commande a été reçu.\n Numero de commande: ${response.orderTrackingNumber}`);
          
          // reinitialiser le panier, une fois que la commande est faite
          this.resetCart();

        },
        error: err =>{
          alert(`il y a une erreur: ${err.message}`);
        }
      }
    );


    // console.log(this.checkoutFormGroup.get('customer').value);
    // console.log( "l'amail est: "+this.checkoutFormGroup.get('customer').value.email);

    // console.log( "le pays de livraison est: "+this.checkoutFormGroup.get('shippingAddress').value.country.name);
    // console.log( "la region de livraison est: "+this.checkoutFormGroup.get('shippingAddress').value.state.name);

  }

  //reinitialiser le panier-------------------------
  resetCart() {
    //reinitialiser les donnés du panier
    //this.checkoutFormGroup.reset();
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    

    //reinitialiser le formulaire
    this.checkoutFormGroup.reset();

    //renvoyer a la page des produits
    this.router.navigateByUrl("/products");
  }

  //methode qui gere  les mois et le sannées-----------
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

  //methode qui change le state -----------
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
        //verifier si c'est l'Addresse de livraison = de facturaiton, tu me donnes les données
        if(formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;

        }
        else{
          this.billingAddressStates = data;
        }

        //selecitonner le premier state par default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }
}
