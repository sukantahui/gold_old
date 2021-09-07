import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {Subject} from "rxjs";
import {CommonService} from "./common.service";


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
  getAgents(){
    return this.agentList;
  }
  getAgentUpdateListener(){
    return this.agentSub.asObservable();
  }

}
