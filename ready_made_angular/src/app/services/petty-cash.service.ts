import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {

  constructor(private  httpClient: HttpClient , private commonService: CommonService) { }

  saveExpenditure(data){
    return this.httpClient.post(this.commonService.getAPI() + '/expenditureTransactions', data);
  }
  saveIncome(data){
   return  this.httpClient.post(this.commonService.getAPI() + '/incomeTransactions', data)
  }
}
