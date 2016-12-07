import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

@Injectable()
export class WordnikApiService {
  baseUrl: string;
  apiKey: string;

  constructor(private http: Http) {
    this.baseUrl = 'https://api.wordnik.com/v4';
    this.apiKey = '1d39439b64190451c950a08edfb074e4be9d9d3ee9f00631b';
  }

  fetchWord(): Observable<any> {
    return this.http.get(`${this.baseUrl}/words.json/randomWord?minLength=5&maxLength=11&api_key=${this.apiKey}`)
        .map(response => response.json());
  }
}