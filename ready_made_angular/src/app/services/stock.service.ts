import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {Subject, throwError} from 'rxjs';
import {Product} from '../models/product.model';
import {Stock} from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockForm: FormGroup;
  productData: Product[] = [];
  stockData: Stock[] = [];
  jobData: any[] = [];
  productsSub = new Subject<any[]>();
  jobsSub = new Subject<any[]>();
  stocksSub = new Subject<any[]>();
  private BASE_API_URL = environment.BASE_API_URL;
  constructor(private  http: HttpClient , private  errorService: ErrorService) {

    this.http.get(this.BASE_API_URL + '/stocks').subscribe((response: {status: any , data: Stock[]}) => {
      this.stockData = response.data;
      this.stocksSub.next([...this.stockData]);
    });
    this.http.get(this.BASE_API_URL + '/jobs').subscribe((response: {status: any , data: Stock[]}) => {
      this.jobData = response.data;
      this.jobsSub.next([...this.jobData]);
    });
    this.stockForm = new FormGroup({
      tag:  new FormControl(null, [Validators.required]),
      modelNo:  new FormControl(null, [Validators.required]),
      modelSize:  new FormControl(null, [Validators.required]),
      quantity:  new FormControl(null, [Validators.required]),
      gold:  new FormControl(null , [Validators.required]),
      labourCharge:  new FormControl(null, [Validators.required]),
      grossWeight:  new FormControl(null, [Validators.required]),
      packageWeight:  new FormControl(null, [Validators.required]),
      inStock:  new FormControl(1),
      agentId:  new FormControl('AG2018'),
      employeeId:  new FormControl(46),
      reference:  new FormControl(null),
      billNo:  new FormControl(null, [Validators.required]),
      jobId:  new FormControl(null),
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
    return this.http.post(this.BASE_API_URL + '/stocks', this.stockForm.value)
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
    return this.http.get(this.BASE_API_URL + '/getDetailsByJobId/' + this.stockForm.value.jobId);
  }

}
