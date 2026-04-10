import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {catchError, tap} from 'rxjs/operators';
import {ServerResponse} from '../models/ServerResponse.model';
import {MonthlyTransaction} from '../models/monthly-transaction.model';
export interface ClosingBalanceResponse {
  status: boolean;
  data: number;
}
@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private commonService: CommonService, private  http: HttpClient , private  errorService: ErrorService) {
  }
  getMonthlySavedTransactions(data: { rmId: number;  recordYear: number; recordMonth: number }){
    return this.http.get<any>(
        // tslint:disable-next-line:max-line-length
        this.commonService.getAPI() + '/monthly-transactions/saved/' + data.recordYear + '/' + data.recordMonth + '/' + data.rmId
    )
        .pipe(catchError(this.errorService.serverError));
  }
  getMonthlyTotalGiniToFineByManager(data: { fromRmId: number; toRmId: number; recordYear: number; recordMonth: number }){
    return this.http.get<any>(
        // tslint:disable-next-line:max-line-length
        this.commonService.getAPI() + '/monthly-transactions/transformation/' + data.recordYear + '/' + data.recordMonth + '/72/' + data.fromRmId + '/' + data.toRmId
    )
        .pipe(catchError(this.errorService.serverError));
  }
  getMonthlyTotalFineToGiniByManager(data: { fromRmId: number; toRmId: number; recordYear: number; recordMonth: number }){
    return this.http.get<any>(
        // tslint:disable-next-line:max-line-length
        this.commonService.getAPI() + '/monthly-transactions/transformation/' + data.recordYear + '/' + data.recordMonth + '/72/' + data.fromRmId + '/' + data.toRmId
    )
        .pipe(catchError(this.errorService.serverError));
  }

  // to owner
  getMonthlyTotalMaterialFromManagerToOwner(data: { rmId: number; recordYear: number; recordMonth: number }){
    // '/transfer/{year}/{month}/{fromEmployee}/{toEmployee}/{rmId}'
    // manager is 72 , sender
    // owner is 28 , receiver
    return this.http.get<any>(
        this.commonService.getAPI() + '/monthly-transactions/transfer/' + data.recordYear + '/' + data.recordMonth + '/72/28/' + data.rmId
    )
        .pipe(catchError(this.errorService.serverError));
  }

  // from owner
  getMonthlyTotalMaterialFromownerToManager(data: { rmId: number; recordYear: number; recordMonth: number }){
    // '/transfer/{year}/{month}/{fromEmployee}/{toEmployee}/{rmId}'
    // manager is 72 , receiver
    // owner is 28 , sender
    return this.http.get<any>(
        this.commonService.getAPI() + '/monthly-transactions/transfer/' + data.recordYear + '/' + data.recordMonth + '/28/72/' + data.rmId
    )
        .pipe(catchError(this.errorService.serverError));
  }

  getMonthlyTotalMaterialFromManagerToProductionManager(data: { rmId: number; recordYear: number; recordMonth: number }){
    return this.http.get<any>(
        this.commonService.getAPI() + '/monthly-transactions/transfer/' + data.recordYear + '/' + data.recordMonth + '/72/70/' + data.rmId
    )
        .pipe(catchError(this.errorService.serverError));
  }
  getMonthlyTotalMaterialFromProductionManagerToManager(data: { rmId: number; recordYear: number; recordMonth: number }){
    return this.http.get<any>(
        this.commonService.getAPI() + '/monthly-transactions/transfer/' + data.recordYear + '/' + data.recordMonth + '/70/72/' + data.rmId
    )
        .pipe(catchError(this.errorService.serverError));
  }
  getMonthlyTransactionClosingBalance(
      data: { rmId: number; recordYear: number; recordMonth: number }
  ) {
    return this.http.post<ClosingBalanceResponse>(
        this.commonService.getAPI() + '/monthly-transactions/closing-balance',
        data
    )
        .pipe(catchError(this.errorService.serverError));
  }
  saveFineToNinetyTwo(fineTwoNinetyTwoData: any){
    return  this.http.post(this.commonService.getAPI() + '/fineTwoNinetyTwo', fineTwoNinetyTwoData)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
  saveDalCreation(dalCreationData: any){
    return  this.http.post(this.commonService.getAPI() + '/dalCreation', dalCreationData)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
  savePanCreation(dalCreationData: any){
    return  this.http.post(this.commonService.getAPI() + '/panCreation', dalCreationData)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
  saveMaterialTransfer(materialTransfer: any) {
    return  this.http.post(this.commonService.getAPI() + '/matBetweenEmployees', materialTransfer)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
  saveMaterialFromEmployee(materialTransfer: any) {
    return  this.http.post(this.commonService.getAPI() + '/materialFromEmployee', materialTransfer)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
  saveCashTransactionBetweenEmployee(cashWithdrawData: any){
    return  this.http.post(this.commonService.getAPI() + '/cashTransactionBetweenEmployee', cashWithdrawData)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
  cashTransactionsByCurrentUser(){
    return this.http.get<ServerResponse>(this.commonService.getAPI() + '/cahTransactionsByCurrentEmployee')
        .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
          if (response.status === true){

          }

        }));
  }

  // special Owner to Manager
  saveMaterialFromOwnerToManager(materialTransfer: any) {
    return  this.http.post(this.commonService.getAPI() + '/materialFromOwnerToManager', materialTransfer)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }

  // special Owner from Manager
  saveMaterialFromManagerToOwner(materialTransfer: any) {
    return  this.http.post(this.commonService.getAPI() + '/materialFromManagerToOwner', materialTransfer)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
  saveNitricToFine(materialConversion: any) {
    return  this.http.post(this.commonService.getAPI() + '/nitricToFine', materialConversion)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
  addTopUpGold(job: number, gold: number) {
    return  this.http.put(this.commonService.getAPI() + '/topUpGold/' + job + '/' + gold, {})
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }

  // Saving GP Transaction
  saveGpTransactions(gpTransactionData: any) {
    return  this.http.post(this.commonService.getAPI() + '/gpTransactions', gpTransactionData)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }

  // Save Monthly Managerial Report
  saveMonthlyTransactions(data: { records: MonthlyTransaction[] }) {
    return this.http.post(
        this.commonService.getAPI() + '/monthly-transactions',
        data
    ).pipe(
        catchError(this.errorService.serverError),
        tap((response: any) => {
          if (response) {
            console.log('Monthly transactions saved');
          }
        })
    );
  }


}
