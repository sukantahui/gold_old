import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-agent-salary',
  templateUrl: './agent-salary.component.html',
  styleUrls: ['./agent-salary.component.scss']
})
export class AgentSalaryComponent implements OnInit {
  agentSalarySearchForm: FormGroup;
  isProduction = environment.production;
  year = 2022;
  month = 1;
  isLoading = false;
  constructor() {

    this.agentSalarySearchForm = new FormGroup({
      year: new FormControl(2022),
      month: new FormControl(5),
    });
  }

  ngOnInit(): void {
  }

    getReport() {

    }
}
