import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AgentService} from '../../../../../services/agent.service';
import {DownloadService} from '../../../../../services/download.service';
import {SalaryService} from '../../../../../services/salary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salary-holder-salary-payment',
  templateUrl: './salary-holder-salary-payment.component.html',
  styleUrls: ['./salary-holder-salary-payment.component.scss']
})
export class SalaryHolderSalaryPaymentComponent implements OnInit {
  isProduction = environment.production;
  salaryHolderSalaryPaymentForm: FormGroup;
  salaryHolders: any[];
  savedResponse: any;
  constructor(private route: ActivatedRoute, private salaryService: SalaryService, private downloads: DownloadService) {
    this.route.data.subscribe((response: any) => {
      this.salaryHolders = response.salaryHolderSalaryPaymentResolver.salaryHolders.data;
    });

    this.salaryHolderSalaryPaymentForm = new FormGroup({
      yearNumber: new FormControl(2022),
      monthNumber: new FormControl(5),
      salaryHolderId: new FormControl(null),
      salaryPaid: new FormControl(0),
      advanceAdjusted: new FormControl(0)
    });
  }

  ngOnInit(): void {
  }

  onSalaryHolderSelect($event: any) {

  }

  saveSalaryPayment() {
    // tslint:disable-next-line:max-line-length
    this.salaryService.saveSalaryHolderPayment(this.salaryHolderSalaryPaymentForm.value).subscribe((response: {status: boolean, message: string, data: any}) => {
      this.savedResponse = response.data;
      if (response.status === true){
        Swal.fire({
          title: 'Done',
          text: 'Salary Paid successfully',
          icon: 'success'
        });
      }else{
        Swal.fire({
          title: 'Failed',
          text: 'Unable to save',
          icon: 'error'
        });
      }
    }, error => {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Unable to save',
        icon: 'error'
      });
    });
  }
}