import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-lc-receipt',
  templateUrl: './customer-receipt.component.html',
  styleUrls: ['./customer-receipt.component.scss']
})
export class CustomerReceiptComponent implements OnInit {
  isProduction = environment.production;
  subject = 'Customer Receipt';

  // for showing it only in development phase not in build phase
  constructor() { }

  ngOnInit(): void {
  }

}
