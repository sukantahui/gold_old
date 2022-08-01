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
  currentSalary: any;
  yearNumber: number;
  monthNumber: number;
  currentSalaryList: any[];
  constructor(private route: ActivatedRoute, private salaryService: SalaryService, private downloads: DownloadService) {
    this.route.data.subscribe((response: any) => {
      this.salaryHolders = response.salaryHolderSalaryPaymentResolver.salaryHolders.data;
    });
    const salaryMonth = new Date().getMonth();
    const salaryYear = new Date().getFullYear();
    this.yearNumber = salaryYear;
    this.monthNumber = salaryMonth;
    this.salaryHolderSalaryPaymentForm = new FormGroup({
      yearNumber: new FormControl(salaryYear),
      monthNumber: new FormControl(salaryMonth),
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

    showCurrentSalary() {
      // tslint:disable-next-line:max-line-length
      this.salaryService.getSalaryByIdMonthAndYear(this.salaryHolderSalaryPaymentForm.value).subscribe((response: {status: boolean, message: string, data: any}) => {
        if (response.status === true){
          this.currentSalary = response.data;
        }else{
          Swal.fire({
            title: 'Failed',
            text: 'Unable to get data',
            icon: 'error'
          });
        }
      }, error => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Select proper data first',
          icon: 'error'
        });
      });
    }

  onYearChange(yearNumber: any) {
    this.salaryHolderSalaryPaymentForm.get('yearNumber').setValue(yearNumber, { emitEvent: false });
  }

  onMonthChange(monthNumber: any) {
    this.salaryHolderSalaryPaymentForm.get('monthNumber').setValue(monthNumber, { emitEvent: false });
  }


  showAllSalaries() {
    // tslint:disable-next-line:max-line-length
    this.salaryService.getSalaryByMonthAndYear(this.yearNumber, this.monthNumber).subscribe((response: {status: boolean, message: string, data: any}) => {
      if (response.status === true){
        this.currentSalaryList = response.data;
      }else{
        Swal.fire({
          title: 'Failed',
          text: 'Unable to get data',
          icon: 'error'
        });
      }
    }, error => {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Select proper data first',
        icon: 'error'
      });
    });
  }
}
