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
export class MaterialBalanceResolver implements Resolve<any> {
  constructor(private reportService: ReportService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // const a = this.jobTaskService.getAll();
    const b = this.reportService.getMaterialBalance();
    const c = this.reportService.getUser();
    const d = this.reportService.geKarigars();
    const join = forkJoin(b, c, d).pipe(map((allResponses) => {
      return {
        materialBalance: allResponses[0],
        user: allResponses[1],
        karigars: allResponses[2]
      };
    }));
    return join;
  }
}