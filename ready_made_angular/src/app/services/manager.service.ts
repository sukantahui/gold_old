import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private commonService: CommonService, private  http: HttpClient , private  errorService: ErrorService) {
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
}
