import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ReportService} from '../services/report.service';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class PlossWithdrawResolver implements Resolve<any> {
  constructor(private reportService: ReportService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // Simply return the observable from ReportService
    return this.reportService.getTotalPloss();
  }
}
