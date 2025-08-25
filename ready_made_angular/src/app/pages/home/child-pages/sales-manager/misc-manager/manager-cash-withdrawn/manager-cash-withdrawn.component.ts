import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Employee} from '../../../../../../models/employee.model';
import {ProjectDetailsModel} from '../../../../../../models/project-details.model';
import {CashTransaction} from '../../../../../../models/cash-transaction.model';

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
  projectDetails: ProjectDetailsModel;
  selectableEmployees: Employee[];
  cashTransactions: CashTransaction[];

  constructor(private route: ActivatedRoute) {

    this.cashWithdrawForm = new FormGroup({
      payer_id: new FormControl(null, [Validators.required]),
      cash: new FormControl(null, [Validators.required]),
    });
  } // end of constructor


  ngOnInit(): void {
    this.employees = this.route.snapshot.data.employeeResolver.data;
    this.projectDetails = this.route.snapshot.data.projectDetails;
    this.selectableEmployees = this.employees.filter(emp => this.projectDetails.managerCashWithdrawn.employees.find(employee => (employee === emp.employeeId )));
    this.cashTransactions = this.route.snapshot.data.cashTransactionsByEmployee.data;

  }

  saveCashWithdrawn() {

  }

  onEmployeeChange(employeeId: number) {
    // Filter transactions for selected employee
    this.cashTransactions = this.route.snapshot.data.cashTransactionsByEmployee.data
        .filter(txn => txn.payer_id === employeeId || txn.payee_id === employeeId);
  }
}
