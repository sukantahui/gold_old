import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {CurrentUser} from '../../../../../models/current-user.model';
import {ActivatedRoute} from '@angular/router';
import {ManagerService} from '../../../../../services/manager.service';
import {ReportService} from '../../../../../services/report.service';
import {MaterialBetweenEmployeeTransaction} from '../../../../../models/material-between-employee-transaction.model';

@Component({
  selector: 'app-material-transaction-report',
  templateUrl: './material-transaction-report.component.html',
  styleUrls: ['./material-transaction-report.component.scss']
})
export class MaterialTransactionReportComponent implements OnInit {
  showDeveloperDiv = false;
  isProduction = environment.production;
  currentUser: CurrentUser;
  projectDetails: any;
  materialTransactions: MaterialBetweenEmployeeTransaction[];
  searchText: any;
  empFilter = '';
  rmFilter = '';
  constructor(private route: ActivatedRoute, private managerService: ManagerService, private reportService: ReportService) {
    this.currentUser = this.route.snapshot.data.currentUser.data;
    this.projectDetails = this.route.snapshot.data.projectDetails;
    this.materialTransactions = this.route.snapshot.data.materialTransactionBetweenEmployees.data;
  }

  ngOnInit(): void {
  }

}
