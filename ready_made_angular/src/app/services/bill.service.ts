import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {Product} from '../models/product.model';
import {ErrorService} from './error.service';



@Injectable({
  providedIn: 'root'
})
export class BillService {
  private BASE_API_URL = environment.BASE_API_URL;
  constructor(private  http: HttpClient , private  errorService: ErrorService) {
  }
  saveBill(billMasterData, billDetailsData){
    return  this.http.post(this.BASE_API_URL + '/createBill', { billMaster: billMasterData , billDetails : billDetailsData})
        .pipe(catchError(this.errorService.serverError), tap((response: {status: any , data: any }) => {}));
  }
}
