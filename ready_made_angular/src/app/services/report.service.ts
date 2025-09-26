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
    getRawMaterials(){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/rawMaterials')
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    getMaterialTransformationReport(){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/materialTransformationReport')
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    cashBalance(){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/cashBalances')
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    cashTransactionsByCurrentUser(){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/cahTransactionsByCurrentEmployee')
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    materialTransactionsBetweenEmployees(){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/materialBetweenEmployees')
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    getRawMaterialsManager(){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/rawMaterials-manager')
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    getEmployees(){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/employees')
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
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

    getFineWithdrawnByOwner(startDate: string, endDate: string){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/ownerFineWithdrawns/' + startDate + '/' + endDate)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    getCashWithdrawnByOwner(startDate: string, endDate: string){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/ownerCashWithdrawns/' + startDate + '/' + endDate)
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
    getStockInHandGroupwise(){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/stockSummary' )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    getStockInHandByCategory(categoryId: number){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/stockSummary/'+ categoryId)
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
    // user id will be fetched as per current user
    getMaterialBalance(){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/materialBalance' )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    getMaterialBalanceByEmployee(employeeId: number){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/materialBalance/' + employeeId )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }

    getUser(){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/me' )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }
            }));
    }

    geKarigars(){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/karigars/inforce' )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
    geInforcedGaritKarigars(){
        // tslint:disable-next-line:max-line-length
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/karigars/inforce' )
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }


    getOwnerSubmittedMaterials(){
        return this.http.get(this.commonService.getAPI() + '/ownerSubmittedMaterials');
    }

    getMaterialsSendByOwnerByDatesAndMaterial(startDate: any, endDate: any, materialId: any){
        return this.http.get(this.commonService.getAPI() + '/materialFromOwnerToEmployeesByDatesAndMaterial/' + startDate + '/' + endDate + '/' + materialId);
    }

    getJobsByBillNumber(billNumber: any){
        return this.http.post(this.commonService.getAPI() + '/getJobsByBillNo', {bill_number: billNumber});
    }
    getGiiniTransactionByManager(){
        return this.http.get(this.commonService.getAPI() + '/gini_due_by_date');
    }
    getBusinessStatus(){
        return this.http.get(this.commonService.getAPI() + '/current-status-report');
    }
    getJobDetailsforOwner(jobNumber: any){
        return this.http.get<ServerResponse>(this.commonService.getAPI() + '/owner/job-report/' + jobNumber)
            .pipe(catchError(this.errorService.serverError), tap((response: ServerResponse) => {
                if (response.status === true){

                }

            }));
    }
}
