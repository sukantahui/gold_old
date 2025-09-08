import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ReportService} from '../services/report.service';
import {MaterialBetweenEmployeeTransaction} from '../models/material-between-employee-transaction.model';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class MaterialBetweenEmployeesResolver implements Resolve<MaterialBetweenEmployeeTransaction[]> {
  constructor(private reportService: ReportService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MaterialBetweenEmployeeTransaction[]> {
    // @ts-ignore
    return this.reportService.materialTransactionsBetweenEmployees();
  }
}
