import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {NgxFancyLoggerService} from "ngx-fancy-logger";
import {ServerResponse} from "../models/ServerResponse.model";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {CommonService} from "./common.service";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class OfficeStaffStatusReportService {

  constructor(private commonService: CommonService,private http: HttpClient, private errorService: ErrorService, private logger: NgxFancyLoggerService) { }

  // gold received from owner
  getMaterialReceivedByDate(startDate: string,endDate: string, rmId: number,employeeId: number){
    return this.http.get<ServerResponse>(this.commonService.getAPI() + '/materialReceivedTransactions/total/'+startDate+'/'+endDate+'/'+rmId+'/'+employeeId+'/1')
        .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
          if (response.status === true){

          }

        }));
  }
  //gold send to job
  getGoldSendToJobByDateAndEmployee(startDate: string,endDate: string, rmId: number,employeeId: number){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/goldSendToJobs/total/'+startDate+'/'+endDate+'/'+rmId+'/'+employeeId)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
  }

  //gold received from job
  getGoldReceivedFromJobByDateAndEmployee(startDate: string,endDate: string, rmId: number,employeeId: number){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/goldReceivedFromJobs/total/'+startDate+'/'+endDate+'/'+rmId+'/'+employeeId)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
  }

  //nitric received from job
  getNitricReceivedFromJobByDateAndEmployee(startDate: string,endDate: string, rmId: number,employeeId: number){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/nitricReceivedFromJobs/total/'+startDate+'/'+endDate+'/'+rmId+'/'+employeeId)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
  }
  //Bill Total by Date
  getBillTotalByDate(startDate: string,endDate: string){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/billTotal/total/'+startDate+'/'+endDate)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
  }



}
