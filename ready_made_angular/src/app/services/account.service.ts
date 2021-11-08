import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class AccountService {
  expenditureList: any[] = [];
  expenditureSub = new Subject<any[]>();

  incomeList: any[] = [];
  incomeSub = new Subject<any[]>();
  constructor(private commonService: CommonService, private  http: HttpClient, private  errorService: ErrorService) {
    this.http.get(this.commonService.getAPI() + '/expenditureLedgers').subscribe((response: {success: number , data: any[]}) => {
      this.expenditureList =  response.data;
      this.expenditureSub.next([...this.expenditureList]);
    });

    this.http.get(this.commonService.getAPI() + '/incomeLedgers').subscribe((response: {success: number , data: any[]}) => {
      this.incomeList =  response.data;
      this.incomeSub.next([...this.incomeList]);
    });
  }
  getExpenditureLedgers(){
    return this.expenditureList;
  }
  getExpenditureLedgerListener(){
    return this.expenditureSub.asObservable();
  }

  getIncomeLedgers(){
    return this.incomeList;
  }
  getIncomeLedgerListener(){
    return this.incomeSub.asObservable();
  }
}
