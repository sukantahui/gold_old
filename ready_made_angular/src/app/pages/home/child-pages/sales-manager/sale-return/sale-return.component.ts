import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sale-return',
  templateUrl: './sale-return.component.html',
  styleUrls: ['./sale-return.component.scss']
})
export class SaleReturnComponent implements OnInit {
  isProduction = environment.production;
  agents: any[];
  saleReturnForm: FormGroup;
  isLoading = false;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.saleReturnResolver.agents.data;
    });
    this.saleReturnForm = new FormGroup({
      yearNumber: new FormControl(2022),
      monthNumber: new FormControl(5),
      agentId: new FormControl(null),
      amount: new FormControl(100),
    });
  }

  ngOnInit(): void {
  }

}
