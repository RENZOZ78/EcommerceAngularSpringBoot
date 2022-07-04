import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class SportManShopFormService {

  private countriesUrl = environment.sportmanApiUrl + '/countries';
  private statesUrl = environment.sportmanApiUrl + '/states';


  constructor(private httpClient: HttpClient) { }

  //methode qui recupere les countries
  getCountries(): Observable<Country[]>{

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );

  }

  //methode qui recupere les states
  //le state se definit par le code du country => c'est pour ca qu'on el prend en parametre
  getStates(theCountryCode: string): Observable<State[]>{

    //chercher l'url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  //methode qui recupere le mois de la carte de credit
  getCreditCardMonths(startMonth: number): Observable<number[]>{
    
    let data: number[] = [];

    //crer un tableau pour "Month" liste deroulante
    // - commencer au mois actuel loop jusqu'a la fin
    for (let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }
    
    return of(data);
  }

  
  //methode qui recupere l'année de la carte de credit
  getCreditCardYears(): Observable<number[]>{
    let data: number [] = [] ;

  //creer une methode pour "Years" lsite deroulante
  const startYear: number = new Date().getFullYear();
  const endYear: number = startYear +10;

    for (let theYear = startYear; theYear <= endYear; theYear++ ){
      data.push(theYear);
    }
    return of(data);
  }

}

interface GetResponseCountries{
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded: {
    states: State[];
  }
}
