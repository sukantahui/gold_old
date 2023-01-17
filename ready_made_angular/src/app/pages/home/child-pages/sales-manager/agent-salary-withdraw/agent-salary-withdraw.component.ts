import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../environments/environment';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {AgentService} from '../../../../../services/agent.service';
import {DownloadService} from '../../../../../services/download.service';
import { saveAs } from 'file-saver';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-agent-salary-withdraw',
  templateUrl: './agent-salary-withdraw.component.html',
  styleUrls: ['./agent-salary-withdraw.component.scss']
})
export class AgentSalaryWithdrawComponent implements OnInit {
    agentSalarySearchForm: UntypedFormGroup;
    isProduction = environment.production;
    agents: any[];
    year = 2022;
    month = 1;
    isLoading = false;
    currentMonthTotalSalary = 0;
    currentMonthTotalSalaryWithdraw = 0;
  months = ['No Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(private route: ActivatedRoute, private agentService: AgentService, private downloads: DownloadService) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.agentSalaryWithdrawResolver.agents.data;
    });
    this.agentSalarySearchForm = new UntypedFormGroup({
      yearNumber: new UntypedFormControl(2022),
      monthNumber: new UntypedFormControl(5),
      agentId: new UntypedFormControl(null),
      amount: new UntypedFormControl(100),
    });
  }
  printDivStyle = {
    table: {'border-collapse': 'collapse', width : '100%' },
    label: {width: '100%'},
    th: {border: '1px  solid black' , fontSize : 'small'},
    td: {border: '1px  solid black' , fontSize : 'small'},

  };

  ngOnInit(): void {
  }

  saveAgentSalaryWithdrawal() {
      this.agentService.saveAgentSalaryWithdraw(this.agentSalarySearchForm.value).subscribe(response => {
          this.currentMonthTotalSalary = response.data.totalSalary;
          this.currentMonthTotalSalaryWithdraw = response.data.salaryWithdraw;
      }, error => {
          console.log(error);
      });
  }

    onAgentSelect($event: any) {
        // tslint:disable-next-line:max-line-length
        this.agentService.fetchAgentSalaryAndWithdrawByYearAndMonth($event.agent_id, this.agentSalarySearchForm.get('yearNumber').value, this.agentSalarySearchForm.get('monthNumber').value ).subscribe(response => {
            this.currentMonthTotalSalary = response.data.totalSalary;
            this.currentMonthTotalSalaryWithdraw = response.data.salaryWithdraw;
        });
    }

    download(): void {
        this.downloads
            .download('/downloads/archive.zip')
            .subscribe(blob => {
                const a = document.createElement('a')
                const objectUrl = URL.createObjectURL(blob)
                a.href = objectUrl
                a.download = 'archive.zip';
                a.click();
                URL.revokeObjectURL(objectUrl);
            });
    }

    download2(file: string) {
        this.downloads
            .download('assets/downloads/' + file)
            .subscribe(blob => saveAs(blob, file));
    }

}
