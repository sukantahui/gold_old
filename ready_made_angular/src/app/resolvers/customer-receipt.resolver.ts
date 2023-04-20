import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {AgentService} from '../services/agent.service';
import {ProductService} from '../services/product.service';
import {ReportService} from '../services/report.service';
import {CustomerService} from '../services/customer.service';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CustomerReceiptResolver implements Resolve<boolean> {
  constructor(private agentService: AgentService, private customerService: CustomerService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // const a = this.jobTaskService.getAll();
    const b = this.agentService.fetchAgents();
    const c = this.customerService.fetchCustomers();
    const join = forkJoin(b, c).pipe(map((allResponses) => {
      return {
        agents: allResponses[0],
        customers: allResponses[1]
      };
    }));
    return join;
  }
}
