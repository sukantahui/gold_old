import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-salary-holder',
  templateUrl: './salary-holder.component.html',
  styleUrls: ['./salary-holder.component.scss']
})
export class SalaryHolderComponent implements OnInit {
  isProduction = environment.production;
  constructor() { }

  ngOnInit(): void {
  }

}
