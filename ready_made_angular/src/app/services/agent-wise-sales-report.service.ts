import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentWiseSalesReportService {
  agentData: any[] = [];
  agentSub = new Subject<any[]>();
  private BASE_API_URL = environment.BASE_API_URL;
  constructor(private  http: HttpClient, private  errorService: ErrorService) {
    this.http.get(this.BASE_API_URL + '/agents').subscribe((response: {success: number , data: any[]}) => {
      this.agentData =  response.data;
      this.agentSub.next([...this.agentData]);
    });
  }
  getAgentsUpdateListener(){
    return this.agentSub.asObservable();
  }
}
