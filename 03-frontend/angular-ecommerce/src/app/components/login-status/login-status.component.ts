import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuth  } from '@okta/okta-auth-js';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

   isAuthenticated: boolean = false;
   userFullName: string;

   storage: Storage = sessionStorage;


  constructor(private oktaAuthService: OktaAuthStateService,@Inject(OKTA_AUTH) private oktaAuth: OktaAuth ) {  }

  ngOnInit(): void {

    //souscrire aux changement de state de authentification
    this.oktaAuthService.authState$.subscribe(
      (result) =>{
        this.isAuthenticated = result.isAuthenticated;
        this.getUserDetails();
      }
    );

  }
  //methode qui recuepre les details de l'user
  getUserDetails() {
    if(this.isAuthenticated){

      //fetch les details si l'utilisateur est authentifié

      //recuperer el nom complets si le nom est exposé en tant que propriété de nom
      this.oktaAuth.getUser().then(
        (res) =>{
          this.userFullName = res.name;

          //recuperer l'email du user a partir de la reponse d'authentification
          const theEmail = res.email;

          //maintenant on stoke l'email dans le stikage du navigateur
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        }
      );

    }
  }

  //methode logout
  logout(){
    //terminier la session de okta et enlever les current tokens
    this.oktaAuth.signOut();
  }

}
