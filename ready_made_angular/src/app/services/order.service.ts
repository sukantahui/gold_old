import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private commonService: CommonService, private  http: HttpClient , private  errorService: ErrorService) { }
  saveOrder(orderMasterData, orderDetailsData){
    return this.http.post(this.commonService.getAPI() + '/save', {orderMaster: orderMasterData , orderDetails: orderDetailsData});
  }
  getOrderMasterList(pageSize: number){
    return this.http.get(this.commonService.getAPI() + '/dev/getOrderMasterList/' + pageSize);
  }

  getOrderDetailsByOrderMaster(orderMasterId){
    return this.http.get(this.commonService.getAPI() + '/orderDetails/orderMasterId/' + orderMasterId);
  }
}
