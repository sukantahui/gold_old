import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {CommonService} from "../../../../../services/common.service";
import {HttpClient} from "@angular/common/http";
import {BillService} from "../../../../../services/bill.service";

class httpClient {
}

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {
  isProduction = environment.production;
  billableOrders: any[] =[];
  constructor( private  http: HttpClient, private commonService: CommonService, private billService: BillService) { }

  ngOnInit(): void {
    this.billService.getBillableOrders().subscribe(response => {
      this.billableOrders = response.data;
    });
  }

  onOrderSelected(row: any){
    console.log(row);
  }

}
