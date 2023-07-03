import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, ActivatedRoute
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {ReportService} from '../services/report.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class MaterialResolver implements Resolve<boolean> {
  private projectDetails: any;
  constructor(private reportService: ReportService, private http: HttpClient){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('in resolve');
    const a = this.reportService.getUser();
    const b = this.http.get('assets/projectDetails.json');
    const c = this.reportService.getEmployees();
    const join = forkJoin(a, b, c).pipe(map((allResponses) => {
      return {
        user: allResponses[0],
        projectDetails: allResponses[1],
        employees: allResponses[2]
      };
    }));
    return join;
  }
}
