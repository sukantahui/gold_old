import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {AgentService} from '../services/agent.service';

@Injectable({
  providedIn: 'root'
})
export class AgentSalaryWithdrawResolver implements Resolve<any> {
  constructor(private agentService: AgentService){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // const a = this.jobTaskService.getAll();
    const b = this.agentService.fetchAgents();
    console.log('Agent Salary Withdraw Resolver');
    const join = forkJoin(b).pipe(map((allResponses) => {
      return {
        agents: allResponses[0]
      };
    }));
    return join;
  }
}
