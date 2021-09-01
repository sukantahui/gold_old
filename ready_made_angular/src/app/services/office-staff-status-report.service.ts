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

  // gold received from owner
  getMaterialReceivedByDate(startDate: string,endDate: string, rmId: number,employeeId: number){
    return this.http.get<ServerResponse>(this.BASE_API_URL + '/dev/materialReceivedTransactions/total/'+startDate+'/'+endDate+'/'+rmId+'/'+employeeId+'/1')
        .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
          if (response.status === true){

          }

        }));
  }
  //gold send to job
  getGoldSendToJobByDateAndEmployee(startDate: string,endDate: string, rmId: number,employeeId: number){
        return this.http.get<ServerResponse>(this.BASE_API_URL + '/dev/goldSendToJobs/total/'+startDate+'/'+endDate+'/'+rmId+'/'+employeeId)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
  }

  //gold received from job
  getGoldReceivedFromJobByDateAndEmployee(startDate: string,endDate: string, rmId: number,employeeId: number){
        return this.http.get<ServerResponse>(this.BASE_API_URL + '/dev/goldReceivedFromJobs/total/'+startDate+'/'+endDate+'/'+rmId+'/'+employeeId)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
  }
  //nitric received from job
  getNitricReceivedFromJobByDateAndEmployee(startDate: string,endDate: string, rmId: number,employeeId: number){
        return this.http.get<ServerResponse>(this.BASE_API_URL + '/dev/nitricReceivedFromJobs/total/'+startDate+'/'+endDate+'/'+rmId+'/'+employeeId)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
  }
}
