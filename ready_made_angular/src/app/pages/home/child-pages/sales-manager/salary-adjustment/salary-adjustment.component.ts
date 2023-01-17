import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {SalaryService} from '../../../../../services/salary.service';
import Swal from 'sweetalert2';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
@Component({
  selector: 'app-salary-adjustment',
  templateUrl: './salary-adjustment.component.html',
  styleUrls: ['./salary-adjustment.component.scss']
})
export class SalaryAdjustmentComponent implements OnInit {
  isProduction = environment.production;
  salaryHolders: any[];
  sumOfCalculatedSalary = 0;
  printDivStyle: any;
  salaryYearMonthForm: UntypedFormGroup;
  salaryYear: number;
  salaryMonth: number;
  constructor(private route: ActivatedRoute, private salaryService: SalaryService) {
    this.route.data.subscribe((response: any) => {
      this.salaryHolders = response.salaryAdjustmentResolver.salaryHolders.data;
      this.salaryYear = response.salaryAdjustmentResolver.salaryPeriod.data.yearNumber;
      this.salaryMonth = response.salaryAdjustmentResolver.salaryPeriod.data.monthNumber;
      this.salaryYearMonthForm = new UntypedFormGroup({
        yearNumber: new UntypedFormControl(this.salaryYear),
        monthNumber: new UntypedFormControl(this.salaryMonth)
      });
      this.sumOfCalculatedSalary = this.salaryHolders.map(a => a.calculatedSalary).reduce((a, b) => {
        return a + b;
      });
    });




  }
  // @ts-ignore
  printDivStyle = {
    table: {'border-collapse': 'collapse', width : '100%' },
    label: {width: '100%'},
    th: {border: '1px  solid black' , fontSize : 'small'},
    td: {border: '1px  solid black' , fontSize : 'small'},

  };

  ngOnInit(): void {

  }




    onHourDeductionChange() {
      this.salaryHolders.map((obj) => {
        obj.hourDeductionAmount = obj.hourDeduction * obj.hourlyRate;
        obj.calculatedSalary = obj.salary - obj.deduction - obj.hourDeductionAmount + obj.amountAdded;
      });
      this.sumOfCalculatedSalary = this.salaryHolders.map(a => a.calculatedSalary).reduce((a, b) => {
        return a + b;
      });

    }

  onDeductionPercentageChange(deductionPercentage: string) {
    const dp = Number(deductionPercentage);
    this.salaryHolders.map((obj) => {
      obj.salaryDeductionPercentage = dp;
      obj.deduction = obj.salary * dp / 100;
      obj.calculatedSalary = obj.salary - obj.deduction - obj.hourDeductionAmount + obj.amountAdded;
    });
    this.sumOfCalculatedSalary = this.salaryHolders.map(a => a.calculatedSalary).reduce((a, b) => {
      return a + b;
    });
  }

  onMonthlyDeductionPercentageChange(salaryHolder: any) {
    // deduction salaryDeductionPercentage
    salaryHolder.deduction = salaryHolder.salary * salaryHolder.salaryDeductionPercentage / 100;
    // tslint:disable-next-line:max-line-length
    salaryHolder.calculatedSalary = salaryHolder.salary - salaryHolder.deduction - salaryHolder.hourDeductionAmount + salaryHolder.amountAdded;
    this.sumOfCalculatedSalary = this.salaryHolders.map(a => a.calculatedSalary).reduce((a, b) => {
      return a + b;
    });
  }

  onAmountAddedChange(salaryHolder: any) {
    // tslint:disable-next-line:max-line-length
    salaryHolder.calculatedSalary = salaryHolder.salary - salaryHolder.deduction - salaryHolder.hourDeductionAmount + salaryHolder.amountAdded;
    this.sumOfCalculatedSalary = this.salaryHolders.map(a => a.calculatedSalary).reduce((a, b) => {
      return a + b;
    });
  }

  saveSalary() {
    this.salaryService.saveSalaryHolderSalary(this.salaryHolders).subscribe((response: {status: boolean, message: string, data: any}) => {
      if (response.status === true){
        Swal.fire({
          title: 'Done',
          text: 'Salary saved successfully',
          icon: 'success'
        });
      }else{
        Swal.fire({
          title: 'Failed',
          text: 'Unable to save',
          icon: 'error'
        });
      }
    });
  }
}
