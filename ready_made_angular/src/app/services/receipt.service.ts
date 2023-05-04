import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ReceiptService {

  constructor(private commonService: CommonService, private http: HttpClient, private errorService: ErrorService) { }
  saveLcReceipt(lcReceiptData: any){
    return this.http.post(this.commonService.getAPI() + '/lcReceipt/save', lcReceiptData);
  }
  getLcReceiptsByCustomer(customer_id: any){
    return this.http.get(this.commonService.getAPI() + '/lcReceipt/' + customer_id);
  }
  getGoldReceiptsByCustomer(customer_id: any){
    return this.http.get(this.commonService.getAPI() + '/customer/goldReceipt/' + customer_id);
  }
  getLcReceiptById(lcReceiptNumber: string){
    return this.http.post(this.commonService.getAPI() + '/lcReceipt/byReceiptNumber',{lc_receipt_number: lcReceiptNumber});
  }
}
