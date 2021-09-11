import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  saveOrder(orderMasterData, orderDetailsData){
    console.log('service');
    console.log(orderMasterData);
    console.log(orderDetailsData);
  }
}
