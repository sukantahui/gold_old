import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {NgxFancyLoggerService} from "ngx-fancy-logger";
import {ServerResponse} from "../models/ServerResponse.model";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class OfficeStaffStatusReportService {
  private BASE_API_URL = environment.BASE_API_URL;
  constructor(private http: HttpClient, private errorService: ErrorService, private logger: NgxFancyLoggerService) { }
  getMaterialReceivedByDate(startDate: string,endDate: string){
    return this.http.get<ServerResponse>(this.BASE_API_URL + '/dev/materialReceivedTransactions/total/'+startDate+'/'+endDate+'/48/70/1')
        .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
          if (response.status === true){

          }

        }));
  }
}
