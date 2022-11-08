import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {AgentService} from '../services/agent.service';
import {ProductService} from '../services/product.service';
import {ReportService} from '../services/report.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleReturnResolver implements Resolve<boolean> {
  constructor(private agentService: AgentService, private productService: ProductService, private reportService: ReportService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const b = this.agentService.fetchAgents();
    const join = forkJoin(b).pipe(map((allResponses) => {
      return {
        agents: allResponses[0]
      };
    }));
    return join;
  }
}
