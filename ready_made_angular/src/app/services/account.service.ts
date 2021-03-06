import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {forkJoin} from 'rxjs';


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
    // this.http.get(this.commonService.getAPI() + '/expenditureLedgers').subscribe((response: {success: number , data: any[]}) => {
    //   this.expenditureList =  response.data;
    //   this.expenditureSub.next([...this.expenditureList]);
    // });
    // // getting Income Ledgers
    // this.http.get(this.commonService.getAPI() + '/incomeLedgers').subscribe((response: {success: number , data: any[]}) => {
    //   this.incomeList =  response.data;
    //   this.incomeSub.next([...this.incomeList]);
    // });
    //
    // // getting Assets
    // this.http.get(this.commonService.getAPI() + '/assets').subscribe((response: {success: number , data: any[]}) => {
    //   this.assetList =  response.data;
    //   this.assetSub.next([...this.assetList]);
    // });

    // ---------implementing fork join for multiple api request --------------------



    // @ts-ignore
    // @ts-ignore
    forkJoin({
      request1:  this.http.get<{success: number , data: any[]}>(this.commonService.getAPI() + '/expenditureLedgers'),
      request2:  this.http.get<{success: number , data: any[]}>(this.commonService.getAPI() + '/incomeLedgers'),
      request3:  this.http.get<{success: number , data: any[]}>(this.commonService.getAPI() + '/assets'),
      // tslint:disable-next-line:variable-name
    }).subscribe(({request1, request2, request3}) => {
      this.expenditureList =  request1.data;
      this.expenditureSub.next([...this.expenditureList]);

      this.incomeList =  request2.data;
      this.incomeSub.next([...this.incomeList]);

      this.assetList =  request3.data;
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
