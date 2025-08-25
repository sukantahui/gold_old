import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ReportService} from '../services/report.service';
import {HttpClient} from '@angular/common/http';
import {CashTransaction} from '../models/cash-transaction.model';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CashTransactionByEmployeeResolver implements Resolve<CashTransaction[]> {
  constructor(private reportService: ReportService, private http: HttpClient) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CashTransaction[]> {
    // @ts-ignore
    return this.reportService.cashTransactionsByCurrentUser();
  }
}
