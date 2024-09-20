import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {Subject} from "rxjs";
import {CommonService} from "./common.service";
import {catchError, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class AgentService {

  agentList: any[] = [];
  agentSub = new Subject<any[]>();
  constructor(private commonService: CommonService, private  http: HttpClient, private  errorService: ErrorService) {
    this.http.get(this.commonService.getAPI() + '/agents').subscribe((response: {success: number , data: any[]}) => {
      this.agentList =  response.data;
      this.agentSub.next([...this.agentList]);
    });
  }
  fetchAgents(){
    return this.http.get<any>(this.commonService.getAPI() + '/activeAgents').pipe(catchError(this.errorService.serverError), tap(response => {

    }));
  }
  fetchAgentSalaryAndWithdrawByYearAndMonth(agentId: string, year: number, month: number){
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(this.commonService.getAPI() + '/agentSalaryWithdraw/' + agentId + '/' + year + '/' + month ).pipe(catchError(this.errorService.serverError), tap(response => {

    }));
  }
  saveAgentSalaryByYearAndMonth(salaryYear: number, salaryMonth: number){
    return this.http.post<any>(this.commonService.getAPI() + '/agentSalary/' + salaryYear + '/' + salaryMonth, {})
        .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any }) => {
          // this.agentData.unshift(response.data);
          // this.agentSub.next([...this.agentData]);
        })));
  }
  saveAgentSalaryWithdraw(SalaryWithdrawalData: any){
    return this.http.post<any>(this.commonService.getAPI() + '/agentSalaryWithdraw', SalaryWithdrawalData)
        .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any }) => {
          // this.agentData.unshift(response.data);
          // this.agentSub.next([...this.agentData]);
        })));
  }
  getAgents(){
    return this.agentList;
  }
  getAgentUpdateListener(){
    return this.agentSub.asObservable();
  }

  getAgentsWithDues(){
    return this.http.get(this.commonService.getAPI() + '/getAgentBalance');
  }
  getCustomersWithDuesByAgent(agentId: string){
    return this.http.get(this.commonService.getAPI() + '/getCustomersBalanceByAgentId/' + agentId);
  }
  getCustomersWithDues(){
    return this.http.get(this.commonService.getAPI() + '/customersBalances');
  }

  getCustomerReceiptPayment(custId: string){
    return this.http.get(this.commonService.getAPI() + '/customerReceiptPayments/' + custId);
  }
  getAgentSalaryByYearAndMonth(year: number, month: number){
    return this.http.get(this.commonService.getAPI() + '/agentSalary/' + year + '/' + month);
  }
}
