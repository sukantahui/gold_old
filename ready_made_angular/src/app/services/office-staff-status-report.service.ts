import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {NgxFancyLoggerService} from "ngx-fancy-logger";
import {ServerRespons} from "../models/ServerResponse.model";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class OfficeStaffStatusReportService {

  constructor(private http: HttpClient, private errorService: ErrorService, private logger: NgxFancyLoggerService) { }
  getMaterialReceivedByDate(){
    return this.http.get<ServerRespons>('http://127.0.0.1:8000/api/dev/products', product)
        .pipe(catchError(this.serverError), tap((response: ServerRespons) => {
          if (response.success === 1){
            this.products.unshift(response.data);
            this.productSubject.next([...this.products]);
          }

        }));
  }
}
