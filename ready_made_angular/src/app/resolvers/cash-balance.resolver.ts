import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {EmployeeCashBalance} from '../models/employee-cash-balance.model';
import {ReportService} from '../services/report.service';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CashBalanceResolver implements Resolve<EmployeeCashBalance[]> {
  constructor(private reportService: ReportService, private http: HttpClient) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmployeeCashBalance[]> {
    // @ts-ignore
    return this.reportService.cashBalance();
  }
}
