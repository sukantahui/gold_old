import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject, throwError} from 'rxjs';
import {Product} from '../models/product.model';
import {catchError, tap} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {ServerResponse} from '../models/ServerResponse.model';

@Injectable({
  providedIn: 'root'
})
export class TransferAgentService {

  agentsWithoutCounter: any[] = [];
  productsInCounter: Product[] = [];
  productsByAgent: Product[] = [];
  productsByAgentSub = new Subject<any[]>();
  agentsWithoutCounterSubject = new Subject <any[]>();
  productsInCounterSubject = new Subject <Product[]>();
  private BASE_API_URL = environment.BASE_API_URL;

  constructor(private  http: HttpClient, private  errorService: ErrorService) {
    this.http.get(this.BASE_API_URL + '/agentsExceptCounterAgent').subscribe((response: {success: number , data: any[]}) => {
      this.agentsWithoutCounter =  response.data;
      this.agentsWithoutCounterSubject.next([...this.agentsWithoutCounter]);
    });
    this.http.get(this.BASE_API_URL + '/getProductsForTransfer').subscribe((response: {success: number , data: Product[]}) => {
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
  getProductByAgentUpdateListener(){
    return this.productsByAgentSub.asObservable();
  }
  transferProduct(agentId, tagData){
    return this.http.put<ServerResponse>(this.BASE_API_URL + '/stockToAgent' , {agent_id: agentId , tags: tagData})
        .pipe(catchError(this.errorService.serverError), tap(resData => {
          this.productsInCounter = this.productsInCounter.filter(ar => !resData.data.find(rm => (ar.tag === rm) ));
          this.productsInCounterSubject.next([...this.productsInCounter]);
        }));
  }
  getProductsByAgentId(agentId){
    return this.http.get(this.BASE_API_URL + '/getStockByAgent/' + agentId)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: Product[] }) => {
      this.productsByAgent = response.data;
      this.productsByAgentSub.next([...this.productsByAgent]);
    }));
  }
  getCounterAgentData(){
    return this.http.get(this.BASE_API_URL + '/getCounterAgent');
  }
  getCustomersByAgent(agentId){
   return this.http.get(this.BASE_API_URL + '/getCustomersByAgent/' + agentId);
  }
}
