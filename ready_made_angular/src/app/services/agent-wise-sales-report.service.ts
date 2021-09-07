import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class AgentWiseSalesReportService {
  agentData: any[] = [];
  agentSub = new Subject<any[]>();

  constructor(private commonService: CommonService,private  http: HttpClient, private  errorService: ErrorService) {
    this.http.get(this.commonService.getAPI() + '/agents').subscribe((response: {success: number , data: any[]}) => {
      this.agentData =  response.data;
      this.agentSub.next([...this.agentData]);
      console.log(this.agentData);
    });
  }
  getAgentsUpdateListener(){
    return this.agentSub.asObservable();
  }
}
