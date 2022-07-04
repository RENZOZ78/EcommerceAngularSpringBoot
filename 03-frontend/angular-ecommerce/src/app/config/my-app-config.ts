// export interface MyAppConfig {
// }

export default{
    iodc:{
        clientId: '0oa5793ke0KPU0dlR5d7',
        issuer: 'https://dev-63517545.okta.com/oauth2/default',
        redirectUri: 'https://localhost:4200/login/callback',

        //etendue
            // openid: requiert requete authentification
            //profile: 'fisrt name', last name,... de l'user
            //email: adresse email
        scopes: ['openid', 'profile', 'email']
    }
}