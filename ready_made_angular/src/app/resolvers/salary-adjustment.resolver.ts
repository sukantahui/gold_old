import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {AgentService} from '../services/agent.service';
import {SalaryService} from '../services/salary.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryAdjustmentResolver implements Resolve<any> {
  constructor(private salaryService: SalaryService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // const a = this.jobTaskService.getAll();
    const b = this.salaryService.fetchSalaryHolders();
    const join = forkJoin(b).pipe(map((allResponses) => {
      return {
        salaryHolders: allResponses[0]
      };
    }));
    return join;
  }
}
