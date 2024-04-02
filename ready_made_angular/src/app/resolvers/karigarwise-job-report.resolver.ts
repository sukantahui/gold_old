import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {ReportService} from '../services/report.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class KarigarwiseJobReportResolver implements Resolve<boolean> {
  constructor(private reportService: ReportService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const b = this.reportService.geInforcedGaritKarigars();
    const join = forkJoin(b).pipe(map((allResponses) => {
      return {
        karigars: allResponses[0]
      };
    }));
    return join;
  }
}
