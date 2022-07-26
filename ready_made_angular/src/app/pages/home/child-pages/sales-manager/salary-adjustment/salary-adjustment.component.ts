import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {SalaryService} from '../../../../../services/salary.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-salary-adjustment',
  templateUrl: './salary-adjustment.component.html',
  styleUrls: ['./salary-adjustment.component.scss']
})
export class SalaryAdjustmentComponent implements OnInit {
  isProduction = environment.production;
  salaryHolders: any[];
  constructor(private route: ActivatedRoute, private salaryService: SalaryService) {
    this.route.data.subscribe((response: any) => {
      this.salaryHolders = response.salaryAdjustmentResolver.salaryHolders.data;
    });
  }

  ngOnInit(): void {
  }




    onHourDeductionChange() {
      this.salaryHolders.map((obj) => {
        obj.hourDeductionAmount = obj.hourDeduction * obj.hourlyRate;
        obj.calculatedSalary = obj.salary - obj.deduction - obj.hourDeductionAmount + obj.amountAdded;
      });
    }

  onDeductionPercentageChange(deductionPercentage: string) {
    const dp = Number(deductionPercentage);
    this.salaryHolders.map((obj) => {
      obj.salaryDeductionPercentage = dp;
      obj.deduction = obj.salary * dp / 100;
      obj.calculatedSalary = obj.salary - obj.deduction - obj.hourDeductionAmount + obj.amountAdded;
    });
  }

  onMonthlyDeductionPercentageChange(salaryHolder: any) {
    // deduction salaryDeductionPercentage
    salaryHolder.deduction = salaryHolder.salary * salaryHolder.salaryDeductionPercentage / 100;
    // tslint:disable-next-line:max-line-length
    salaryHolder.calculatedSalary = salaryHolder.salary - salaryHolder.deduction - salaryHolder.hourDeductionAmount + salaryHolder.amountAdded;
  }

  onAmountAddedChange(salaryHolder: any) {
    // tslint:disable-next-line:max-line-length
    salaryHolder.calculatedSalary = salaryHolder.salary - salaryHolder.deduction - salaryHolder.hourDeductionAmount + salaryHolder.amountAdded;
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
