import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CashTransaction } from '../models/cash-transaction.model';
import { ReportService } from '../services/report.service';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CashTransactionResolver implements Resolve<CashTransaction[]> {
  constructor(private reportService: ReportService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CashTransaction[]> {
    // @ts-ignore
    return this.reportService.cashTransactionsByCurrentUser();
  }
}
