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

  assetList: any[] = [];
  assetSub = new Subject<any[]>();
  constructor(private commonService: CommonService, private  http: HttpClient, private  errorService: ErrorService) {
    // getting Expenditure Ledgers
    this.http.get(this.commonService.getAPI() + '/expenditureLedgers').subscribe((response: {success: number , data: any[]}) => {
      this.expenditureList =  response.data;
      this.expenditureSub.next([...this.expenditureList]);
    });
    // getting Income Ledgers
    this.http.get(this.commonService.getAPI() + '/incomeLedgers').subscribe((response: {success: number , data: any[]}) => {
      this.incomeList =  response.data;
      this.incomeSub.next([...this.incomeList]);
    });

    // getting Assets
    this.http.get(this.commonService.getAPI() + '/assets').subscribe((response: {success: number , data: any[]}) => {
      this.assetList =  response.data;
      this.assetSub.next([...this.assetList]);
    });
  }
  // Expenditure Ledgers
  getExpenditureLedgers(){
    return this.expenditureList;
  }
  getExpenditureLedgerListener(){
    return this.expenditureSub.asObservable();
  }
  // Income ledgers
  getIncomeLedgers(){
    return this.incomeList;
  }
  getIncomeLedgerListener(){
    return this.incomeSub.asObservable();
  }

  // assets
  getAssets(){
    return this.assetList;
  }
  getAssetListener(){
    return this.assetSub.asObservable();
  }
}
