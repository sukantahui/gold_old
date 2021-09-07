import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {CommonService} from "./common.service";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ProductService {
  productList: any[] = [];
  productSub = new Subject<any[]>();
  constructor(private commonService: CommonService, private  http: HttpClient, private  errorService: ErrorService) {
    this.http.get(this.commonService.getAPI() + '/dev/products').subscribe((response: {success: number , data: any[]}) => {
      this.productList =  response.data;
      this.productSub.next([...this.productList]);
    });
  }

  getProducts(){
    return this.productList;
  }
  getProductUpdateListener(){
    return this.productSub.asObservable();
  }
}
