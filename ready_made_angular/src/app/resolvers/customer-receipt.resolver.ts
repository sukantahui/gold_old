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


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CustomerReceiptResolver implements Resolve<boolean> {
  constructor(private agentService: AgentService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // const a = this.jobTaskService.getAll();
    const b = this.agentService.fetchAgents();
    const join = forkJoin(b).pipe(map((allResponses) => {
      return {
        agents: allResponses[0]
      };
    }));
    return join;
  }
}
