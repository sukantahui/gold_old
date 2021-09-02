import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {NgxFancyLoggerService} from "ngx-fancy-logger";
import {environment} from "../../environments/environment";
import {ServerResponse} from "../models/ServerResponse.model";
import {catchError, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ReportService {
  private BASE_API_URL = environment.BASE_API_URL;
  constructor(private http: HttpClient, private errorService: ErrorService, private logger: NgxFancyLoggerService) {

  }
  getAgentWiseSaleReport(startDate: string,endDate: string,agentId: string){
    return this.http.get<ServerResponse>(this.BASE_API_URL + '/dev/SalesReport/agent/'+startDate+'/'+endDate+'/'+agentId)
        .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
          if (response.status === true){

          }

        }));
  }

}
