import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {Product} from '../models/product.model';
import {ErrorService} from './error.service';
import {CommonService} from "./common.service";



@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private commonService: CommonService,private  http: HttpClient , private  errorService: ErrorService) {
  }
  saveBill(billMasterData, billDetailsData){
    return  this.http.post(this.commonService.getAPI() + '/createBill', { billMaster: billMasterData , billDetails : billDetailsData})
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
  getBillableOrders(){
    return  this.http.get(this.commonService.getAPI() + '/billableOrders')
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
  getbBillableOrdersByOrderAutoid(data){
    return  this.http.get(this.commonService.getAPI() + '/billableOrdersByOrderId/' + data)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
}
