import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {NgxFancyLoggerService} from "ngx-fancy-logger";
import {environment} from "../../environments/environment";
import {ServerResponse} from "../models/ServerResponse.model";
import {catchError, tap} from "rxjs/operators";
import {CommonService} from "./common.service";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ReportService {
  constructor(private commonService:CommonService,private http: HttpClient, private errorService: ErrorService, private logger: NgxFancyLoggerService) {

  }
  getAgentWiseSaleReport(startDate: string,endDate: string,agentId: string){
      console.log(agentId);
    return this.http.get<ServerResponse>(this.commonService.getAPI() + '/SalesReport/agent/'+startDate+'/'+endDate+'/'+agentId)
        .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
          if (response.status === true){

          }

        }));
  }

}
