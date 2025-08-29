import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {CurrentUser} from '../models/current-user.model';
import {ReportService} from '../services/report.service';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class UserResolver implements Resolve<CurrentUser> {
  constructor(private reportService: ReportService, private http: HttpClient) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CurrentUser> {
    // @ts-ignore
    return this.reportService.getUser();
  }
}
