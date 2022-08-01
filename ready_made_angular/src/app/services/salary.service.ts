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
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(this.commonService.getAPI() + '/salaryHolders').pipe(catchError(this.errorService.serverError), tap(response => {
    }));
  }

  saveSalaryHolderSalary(salaryLis: any[]){
    return this.http.post(this.commonService.getAPI() + '/saveSalary', salaryLis);
  }
  saveSalaryHolderPayment(salaryHolder: any){
    return this.http.post(this.commonService.getAPI() + '/saveSalaryPayment', salaryHolder);
  }

  getSalaryByIdMonthAndYear(salaryData: any){
    // tslint:disable-next-line:max-line-length
     return this.http.get<any>(this.commonService.getAPI() + '/salaryHolderSalaries/' + salaryData.salaryHolderId + '/' + salaryData.yearNumber + '/' + salaryData.monthNumber)
         .pipe(catchError(this.errorService.serverError), tap(response => {

         }));
  }
  getSalaryByMonthAndYear(yearNumber: number, monthNumber: number){
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(this.commonService.getAPI() + '/salaryHolderSalaries/' + yearNumber + '/' + monthNumber)
        .pipe(catchError(this.errorService.serverError), tap(response => {

        }));
  }
}
