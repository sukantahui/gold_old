import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {AgentService} from '../services/agent.service';
import {map} from 'rxjs/operators';
import {CustomerService} from '../services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<any> {
  constructor(private customerService: CustomerService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // const a = this.jobTaskService.getAll();
    const b = this.customerService.fetchCustomers();
    const join = forkJoin(b).pipe(map((allResponses) => {
      return {
        customers: allResponses[0]
      };
    }));
    return join;
  }
}
