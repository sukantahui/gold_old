import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class AgentService {
  private BASE_API_URL = environment.BASE_API_URL;
  agentData: any[] = [];
  agentSub = new Subject<any[]>();
  constructor(private  http: HttpClient, private  errorService: ErrorService) {
    this.http.get(this.BASE_API_URL + '/agents').subscribe((response: {success: number , data: any[]}) => {
      this.agentData =  response.data;
      this.agentSub.next([...this.agentData]);
    });
  }
}
