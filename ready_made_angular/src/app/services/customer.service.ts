import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CustomerService {
  customers: any[] = [];
  customerSub = new Subject<any[]>();
  constructor(private commonService: CommonService, private  http: HttpClient, private  errorService: ErrorService) {
    this.http.get(this.commonService.getAPI() + '/customers').subscribe((response: {success: number , data: any[]}) => {
      this.customers =  response.data;
      this.customerSub.next([...this.customers]);
    });
  }
  getCustomerUpdateListener(){
    return this.customerSub.asObservable();
  }
  getCustomers(){
    return [...this.customers];
  }
  fetchCustomers(){
    return this.http.get<any>(this.commonService.getAPI() + '/customers').pipe(catchError(this.errorService.serverError), tap(response => {

    }));
  }
  fetchCustomersByAgentId(agentId: string){
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(this.commonService.getAPI() + '/getCustomersByAgent/' + agentId).pipe(catchError(this.errorService.serverError), tap(response => {

    }));
  }

  getCustomerDues(customerId: string){
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(this.commonService.getAPI() + '/customer/dues/' + customerId).pipe(catchError(this.errorService.serverError), tap(response => {

    }));
  }

  getCustomersWithBalance(){
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(this.commonService.getAPI() + '/customersBalances').pipe(catchError(this.errorService.serverError), tap(response => {

    }));
  }


}
