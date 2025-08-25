import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProjectDetailsModel } from '../models/project-details.model';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ProjectDetailsResolver implements Resolve<ProjectDetailsModel> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectDetailsModel> {
    return this.http.get<ProjectDetailsModel>('assets/projectDetails.json');
  }
}
