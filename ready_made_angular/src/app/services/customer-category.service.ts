import { Injectable } from '@angular/core';
import {CommonService} from "./common.service";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CustomerCategoryService {
  customerCategoryList: any[];
  customerCategorySub = new Subject<any[]>();

  constructor(private commonService: CommonService, private  http: HttpClient, private  errorService: ErrorService) {
    this.http.get(this.commonService.getAPI() + '/dev/customerCategories/visible').subscribe((response: {success: number , data: any[]}) => {
      this.customerCategoryList =  response.data;
      this.customerCategorySub.next([...this.customerCategoryList]);
    });
  }

  getCategories(){
    return this.customerCategoryList;
  }
  getCustomerCategoryUpdateListener(){
    return this.customerCategorySub.asObservable();
  }
}
