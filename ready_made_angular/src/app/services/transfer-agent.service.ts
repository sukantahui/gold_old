import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferAgentService {

  agentsWithoutCounter: any[];
  productsInCounter: any[];
  agentsWithoutCounterSubject = new Subject <any[]>();
  productsInCounterSubject = new Subject <any[]>();
  private BASE_API_URL = environment.BASE_API_URL;

  constructor(private  http: HttpClient) {
    this.http.get(this.BASE_API_URL + '/agentsExceptCounterAgent').subscribe((response: {success: number , data: any[]}) => {
      this.agentsWithoutCounter =  response.data;
      this.agentsWithoutCounterSubject.next([...this.agentsWithoutCounter]);
    });
    this.http.get(this.BASE_API_URL + '/getProductsForTransfer').subscribe((response: {success: number , data: any[]}) => {
      this.productsInCounter =  response.data;
      this.productsInCounterSubject.next([...this.productsInCounter]);
    });
  }
  getAgentsUpdateListener(){
    return this.agentsWithoutCounterSubject.asObservable();
  }
  getProductsUpdateListener(){
    return this.productsInCounterSubject.asObservable();
  }
  getAgentsWithoutCounter(){
    return this.agentsWithoutCounter;
  }
  getProductsInCounter(){
    return this.productsInCounter;
  }
}
