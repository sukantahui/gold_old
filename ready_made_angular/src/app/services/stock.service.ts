import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {Subject, throwError} from 'rxjs';
import {Product} from '../models/product.model';
import {Stock} from '../models/stock.model';
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockForm: UntypedFormGroup;
  productData: Product[] = [];
  stockData: Stock[] = [];
  jobData: any[] = [];
  productsSub = new Subject<any[]>();
  jobsSub = new Subject<any[]>();
  stocksSub = new Subject<any[]>();

  constructor(private commonService:CommonService, private  http: HttpClient , private  errorService: ErrorService) {

    this.http.get(this.commonService.getAPI() + '/stocks').subscribe((response: {status: any , data: Stock[]}) => {
      this.stockData = response.data;
      this.stocksSub.next([...this.stockData]);
    });
    this.http.get(this.commonService.getAPI() + '/jobs').subscribe((response: {status: any , data: Stock[]}) => {
      this.jobData = response.data;
      this.jobsSub.next([...this.jobData]);
    });
    this.stockForm = new UntypedFormGroup({
      tag:  new UntypedFormControl(null, [Validators.required]),
      modelNo:  new UntypedFormControl(null, [Validators.required]),
      modelSize:  new UntypedFormControl(null, [Validators.required]),
      quantity:  new UntypedFormControl(null, [Validators.required]),
      gold:  new UntypedFormControl(null , [Validators.required]),
      labourCharge:  new UntypedFormControl(null, [Validators.required]),
      grossWeight:  new UntypedFormControl(null, [Validators.required]),
      packageWeight:  new UntypedFormControl(null, [Validators.required]),
      inStock:  new UntypedFormControl(1),
      agentId:  new UntypedFormControl('AG2018'),
      employeeId:  new UntypedFormControl(46),
      reference:  new UntypedFormControl(null),
      billNo:  new UntypedFormControl(null, [Validators.required]),
      jobId:  new UntypedFormControl(null),
    });
  }
  getStocksUpdateListener(){
    return this.stocksSub.asObservable();
  }
  getJobsUpdateListener(){
    return this.jobsSub.asObservable();
  }
  getStockList(){
    return this.stockData;
  }
  saveStock(){
    return this.http.post(this.commonService.getAPI() + '/stocks', this.stockForm.value)
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: Stock}) => {
          if (response.status === true){
            this.stockData.unshift(response.data);
            this.stocksSub.next([...this.stockData]);
          }
        }));
  }
  getProductList(){
    return this.productData;
  }
  getJobList(){
    return this.jobData;
  }
  getDetailsByJobId(){
    return this.http.get(this.commonService.getAPI() + '/getDetailsByJobId/' + this.stockForm.value.jobId);
  }
  getStockByAgent(agentId){
    return this.http.get(this.commonService.getAPI() + '/getStockByAgent/' + agentId);
  }

}
