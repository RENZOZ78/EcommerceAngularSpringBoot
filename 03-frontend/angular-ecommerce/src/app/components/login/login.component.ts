import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
 import OktaSignIn from '@okta/okta-signin-widget';
 //import * as OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from '../../config/my-app-config'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;      

/* A service that is provided by the Okta Angular SDK. It is
  used to get the current authentication state of the user. */

   constructor(private oktaAuthService:OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {    

    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/sportmaniax_logo_250.png',
      baseUrl: myAppConfig.iodc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.iodc.clientId,
      redirectUri: myAppConfig.iodc.redirectUri,
      authParams:{
        pkce: true,
        issuer: myAppConfig.iodc.issuer,
        scopes: myAppConfig.iodc.scopes
      }
     

    });
  }

  ngOnInit(): void {


    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'}, //ce nom doit etre le meme que la div id dans login.compoenent.html
      (response) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error) => {
        throw error;
      }
    );
  }

}
