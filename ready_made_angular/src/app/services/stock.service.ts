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
  productsSub = new Subject<any[]>();
  stocksSub = new Subject<any[]>();
  private BASE_API_URL = environment.BASE_API_URL;
  constructor(private  http: HttpClient , private  errorService: ErrorService) {
    this.http.get(this.BASE_API_URL + '/getModelNumbers').subscribe((response: {status: any , data: Product[]}) => {
      this.productData =  response.data;
      this.productsSub.next([...this.productData]);
    });
    this.http.get(this.BASE_API_URL + '/stocks').subscribe((response: {status: any , data: Stock[]}) => {
      this.stockData = response.data;
      this.stocksSub.next([...this.stockData]);
    });
    this.stockForm = new FormGroup({
      tag:  new FormControl(null, [Validators.required]),
      model_no:  new FormControl(null, [Validators.required]),
      model_size:  new FormControl(null, [Validators.required]),
      quantity:  new FormControl(null, [Validators.required]),
      gold:  new FormControl(null , [Validators.required]),
      labour_charge:  new FormControl(null, [Validators.required]),
      gross_weight:  new FormControl(null, [Validators.required]),
      package_weight:  new FormControl(null, [Validators.required]),
      in_stock:  new FormControl(1),
      agent_id:  new FormControl('AG2018'),
      employee_id:  new FormControl(46),
      reference:  new FormControl(null),
      bill_no:  new FormControl(null, [Validators.required]),
      job_id:  new FormControl(null),
    });
  }
  getProductsUpdateListener(){
    return this.productsSub.asObservable();
  }
  getStocksUpdateListener(){
    return this.stocksSub.asObservable();
  }
  getStockList(){
    return this.stockData;
  }
  saveStock(){
    return this.http.post(this.BASE_API_URL + '/stocks', this.stockForm.value)
        .pipe(catchError(this.errorService.serverError), tap(response => {
        }));
  }
  getPriceByModelNumber(){
    return this.http.get(this.BASE_API_URL + '/getPriceByModelNumber/' + this.stockForm.value.model_no);
  }
  getProductList(){
    return this.productData;
  }
  private serverError(err: any) {
    if (err instanceof Response) {
      return throwError('backend server error ');
      // if you're using lite-server, use the following line
      // instead of the line above:
      // return Observable.throw(err.text() || 'backend server error');
    }
    if (err.status === 0){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: 'Backend Server is not Working', statusText: err.statusText});
    }
    if (err.status === 401){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: 'Your are not authorised', statusText: err.statusText});
    }
    return throwError(err);
  }
}
