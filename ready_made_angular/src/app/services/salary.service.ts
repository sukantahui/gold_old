import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class SalaryService {

  constructor(private commonService: CommonService, private  http: HttpClient, private  errorService: ErrorService) {

  }

  fetchSalaryHolders(){
    return this.http.get<any>(this.commonService.getAPI() + '/salaryHolders').pipe(catchError(this.errorService.serverError), tap(response => {
    }));
  }

  saveSalaryHolderSalary(salaryLis: any[]){
    return this.http.post(this.commonService.getAPI() + '/saveSalary', salaryLis);
  }
}
