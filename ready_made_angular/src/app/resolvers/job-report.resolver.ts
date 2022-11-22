import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {CustomerService} from '../services/customer.service';
import {map} from 'rxjs/operators';
import {ReportService} from '../services/report.service';

@Injectable({
  providedIn: 'root'
})
export class JobReportResolver implements Resolve<any> {
  constructor(private reportService: ReportService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // const a = this.jobTaskService.getAll();
    const b = this.reportService.getAgentDues();
    const join = forkJoin(b).pipe(map((allResponses) => {
      return {
        agentDues: allResponses[0]
      };
    }));
    return join;
  }
}
