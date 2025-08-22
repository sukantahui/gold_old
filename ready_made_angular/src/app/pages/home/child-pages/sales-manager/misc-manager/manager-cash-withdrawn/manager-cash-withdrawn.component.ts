import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Employee} from '../../../../../../models/employee.model';

@Component({
  selector: 'app-manager-cash-withdrawn',
  templateUrl: './manager-cash-withdrawn.component.html',
  styleUrls: ['./manager-cash-withdrawn.component.scss']
})
export class ManagerCashWithdrawnComponent implements OnInit {
  showDeveloperDiv = false;
  isProduction = environment.production;
  cashWithdrawForm: FormGroup;
  employees: Employee[] = [];

  constructor(private route: ActivatedRoute) {

    this.cashWithdrawForm = new FormGroup({
      payer_id: new FormControl(70, [Validators.required]),
      cash: new FormControl(null, [Validators.required]),
    });
  } // end of constructor


  ngOnInit(): void {
    this.employees = this.route.snapshot.data.employeeResolver.data;
  }

  saveCashWithdrawn() {

  }

  onEmployeeChange($event: any) {

  }
}
