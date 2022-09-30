import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {AgentService} from '../services/agent.service';
import {map} from 'rxjs/operators';
import {ProductService} from '../services/product.service';
import {ReportService} from '../services/report.service';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ShowItemStockResolver implements Resolve<any> {
  constructor(private agentService: AgentService, private productService: ProductService, private reportService: ReportService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // const a = this.jobTaskService.getAll();
    const b = this.agentService.fetchAgents();
    const c = this.productService.fetchProductCategories();
    const d = this.reportService.getStockInHand(0, 'AG0000');
    const join = forkJoin(b, c, d).pipe(map((allResponses) => {
      return {
        agents: allResponses[0],
        productCategories: allResponses[1],
        stocksInHand: allResponses[2]
      };
    }));
    return join;
  }
}
