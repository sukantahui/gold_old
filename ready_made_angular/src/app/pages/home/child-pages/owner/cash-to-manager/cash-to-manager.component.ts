import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../../../../models/employee.model';
import {ProjectDetailsModel} from '../../../../../models/project-details.model';
import {CashTransaction} from '../../../../../models/cash-transaction.model';
import {EmployeeCashBalance} from '../../../../../models/employee-cash-balance.model';
import {CurrentUser} from '../../../../../models/current-user.model';
import {ActivatedRoute} from '@angular/router';
import {ManagerService} from '../../../../../services/manager.service';
import {ReportService} from '../../../../../services/report.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cash-to-manager',
  templateUrl: './cash-to-manager.component.html',
  styleUrls: ['./cash-to-manager.component.scss']
})
export class CashToManagerComponent implements OnInit {

  showDeveloperDiv = false;
  isProduction = environment.production;
  cashSubmit: FormGroup;
  employees: Employee[] = [];
  projectDetails: ProjectDetailsModel;
  selectableEmployees: Employee[];
  cashTransactions: CashTransaction[];
  private savedResponse: { status: any; data: any };
  cashBalances: EmployeeCashBalance[];
  currentUser: CurrentUser;

  constructor(private route: ActivatedRoute, private managerService: ManagerService, private reportService: ReportService) {

    this.cashSubmit = new FormGroup({
      payer_id: new FormControl(null, [Validators.required]),
      payee_id: new FormControl(null, [Validators.required]),
      cash: new FormControl(null, [Validators.required]),
    });
  } // end of constructor


  ngOnInit(): void {
    this.employees = this.route.snapshot.data.employeeResolver.data;
    this.projectDetails = this.route.snapshot.data.projectDetails;
    this.cashBalances = this.route.snapshot.data.cashBalances.data;
    this.currentUser = this.route.snapshot.data.currentUser.data;
    this.cashSubmit.patchValue({payer_id: this.currentUser.employeeId});
    // tslint:disable-next-line:triple-equals
    // when user is manager
    if (this.currentUser && this.currentUser.employeeId === 72) {
      this.selectableEmployees = this.employees.filter(
          emp => this.projectDetails.managerCashWithdrawn.employees.find(
              employee => (employee === emp.employeeId)
          )
      );
    }
    // when user is owner
    if (this.currentUser && this.currentUser.employeeId === 28) {
      this.selectableEmployees = this.employees.filter(
          emp => this.projectDetails.ownerCashWithdrawnFromManager.employees.find(
              employee => (employee === emp.employeeId)
          )
      );
    }
    this.cashTransactions = this.route.snapshot.data.cashTransactionsByEmployee.data;

  }

  saveCashWithdrawn() {
    Swal.fire({
      title: 'Withdraw Cash from Employee',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Withdraw',
      cancelButtonText: 'No!',
      background: 'rgba(38,39,47,0.95)'
    }).then((result) => {
      if (!result.value){return; }
      // here API call to save the data
      // tslint:disable-next-line:max-line-length
      this.managerService.saveCashTransactionBetweenEmployee(this.cashSubmit.value).subscribe((response: {status: any , data: any}) => {
        // when saved record successfully
        if (response.status === true) {
          Swal.fire({
            timer: 2000,
            title: 'Saved',
            text: 'Cash Withdrawn successfully',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#1661a0',
            cancelButtonColor: '#d33',
            background: 'rgba(38,39,47,0.95)'
          });
          this.savedResponse = response;
          // tslint:disable-next-line:no-shadowed-variable
          this.managerService.cashTransactionsByCurrentUser().subscribe(response => {
            this.cashTransactions = response.data;
          });
          // tslint:disable-next-line:no-shadowed-variable
          this.reportService.cashBalance().subscribe(response => {
            this.cashBalances = response.data;
          });
          // ✅ reset form after successful save
          this.cashSubmit.reset();
        }
      }, error => {
        // error saving record
        Swal.fire({
          title: error.message,
          text: 'Cash Withdrawn Unsuccessful',
          icon: 'error',
          showConfirmButton: false,
          background: 'rgba(38,39,47,0.95)',
          timer: 3000
        });
      });
    });
  }

  onEmployeeChange(employee: any) {
    // Filter transactions for selected employee
    console.log(employee);
    if (employee) {
      this.cashTransactions = this.route.snapshot.data.cashTransactionsByEmployee.data
          .filter(txn => txn.payer_id === employee.employeeId || txn.payee_id === employee.employeeId);
      this.cashSubmit.patchValue({payee_id: employee.employeeId});
    }else{
      this.cashTransactions = this.route.snapshot.data.cashTransactionsByEmployee.data;
    }
  }

}
