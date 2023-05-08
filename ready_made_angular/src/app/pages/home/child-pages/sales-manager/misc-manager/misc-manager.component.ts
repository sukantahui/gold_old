import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../../../../services/customer.service';
import {ReportService} from '../../../../../services/report.service';
import {ReceiptService} from '../../../../../services/receipt.service';

@Component({
  selector: 'app-misc-manager',
  templateUrl: './misc-manager.component.html',
  styleUrls: ['./misc-manager.component.scss']
})
export class MiscManagerComponent implements OnInit {
  isProduction = environment.production;
  subject = 'Miscellaneous';

  constructor() {

  }

  ngOnInit(): void {
  }

}
