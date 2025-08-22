import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ReportService } from '../services/report.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';


// @ts-ignore
@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class EmployeesResolver implements Resolve<Employee[]> {
  constructor(private reportService: ReportService, private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
    // @ts-ignore
    return this.reportService.getEmployees();
  }
}
