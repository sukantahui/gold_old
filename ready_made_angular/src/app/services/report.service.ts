import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {NgxFancyLoggerService} from 'ngx-fancy-logger';
import {environment} from '../../environments/environment';
import {ServerResponse} from '../models/ServerResponse.model';
import {catchError, tap} from 'rxjs/operators';
import {CommonService} from './common.service';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ReportService {
  constructor(private commonService: CommonService, private http: HttpClient, private errorService: ErrorService, private logger: NgxFancyLoggerService) {

  }
  getAgentWiseSaleReport(startDate: string, endDate: string, agentId: string){
      return this.http.get<ServerResponse>(this.commonService.getAPI() + '/SalesReport/agent/' + startDate + '/' + endDate + '/' + agentId)
        .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
          if (response.status === true){

          }

        }));
  }
    getAgentDues(){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/agentDues')
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }

    getCustomerDuesByAgent(agentId){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/customerDueByAgentId/' + agentId)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    getCustomerTransactionById(customerId){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/customerTransaction/' + customerId)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }

    getJobsByDates(startDate: string, endDate: string){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/owner/jobs/dates/' + startDate + '/' + endDate)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }

  getCurrentJobList(){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/test')
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }

    getModelWiseSaleReport(startDateSql: string, endDateSql: string, reportLimit: number){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/modelWiseSale/' + startDateSql + '/' + endDateSql + '/' + reportLimit)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }

    getSaleByModel(startDateSql: string, endDateSql: string, modelNo: string){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/SaleByModel/' + startDateSql + '/' + endDateSql + '/' + modelNo)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    getStockInHand(productCategoryId: number, agentId: string){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/stocksInHand/' + productCategoryId + '/' + agentId )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }

    // get job by Id
    getJobById(jobById: string){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/job/' + jobById  )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    // get job by Id
    getExtraGoldAddByJobId(jobById: string){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/logs/' + jobById  )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    // get job by Id
    getCustomerDiscountById(custId: string, startDate: string, endDate: string, discount: number){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/customer/discount/' + custId + '/' + startDate + '/' + endDate + '/' + discount )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }

    getCustomerBalanceWithDiscount(custId: string, startDate: string, endDate: string, discount: number){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/customer/balance/' + custId + '/' + startDate + '/' + endDate + '/' + discount )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }




}
