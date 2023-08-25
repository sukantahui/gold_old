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

  saveMaterialTransfer(materialTransfer: any) {
    return  this.http.post(this.commonService.getAPI() + '/matBetweenEmployees', materialTransfer)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
}
