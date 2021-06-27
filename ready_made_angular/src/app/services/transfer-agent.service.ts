import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferAgentService {

  agentData: any[];
  productData: any[];
  agentDataSub = new Subject <any[]>();
  productDataSub = new Subject <any[]>();
  private BASE_API_URL = environment.BASE_API_URL;

  getAgentsUpdateListener(){
    return this.agentDataSub.asObservable();
  }
  getProductsUpdateListener(){
    return this.productDataSub.asObservable();
  }

  constructor(private  http: HttpClient) {
    this.http.get(this.BASE_API_URL + '/agentsExceptCounterAgent').subscribe((response: {success: number , data: any[]}) => {
      this.agentData =  response.data;
      this.agentDataSub.next([...this.agentData]);
    });
    this.http.get(this.BASE_API_URL + '/getProductsForTransfer').subscribe((response: {success: number , data: any[]}) => {
      this.productData =  response.data;
      this.productDataSub.next([...this.productData]);
    });
  }
}
