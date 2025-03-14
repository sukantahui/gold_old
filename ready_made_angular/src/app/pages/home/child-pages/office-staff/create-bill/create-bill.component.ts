import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {CommonService} from "../../../../../services/common.service";
import {HttpClient} from "@angular/common/http";
import {BillService} from "../../../../../services/bill.service";
import {Job} from "../../../../../models/job.model";
import {MessageService} from "primeng/api";

class httpClient {
}

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {
  isProduction = environment.production;
  billableOrders: any[] = [] ;
  jobDetails: Job[] = [];
  selectedOrderIndex = -2;
  selectedOrder: any;
  test = false;
  isDataFetched = false;
  constructor( private  http: HttpClient, private commonService: CommonService, private billService: BillService) {}

  ngOnInit(): void {
    this.billableOrders = [];
    this.billService.getBillableOrders().subscribe(response => {
      this.billableOrders = response.data;
      this.isDataFetched = true;
    });
  }

  onOrderSelected(row: any, index: number) {
    console.log(index);
    this.selectedOrderIndex = index;
    if (index == -1) {
      this.selectedOrderIndex = -1;
      this.selectedOrder = null;
    } else {
      this.selectedOrderIndex = index;
      this.selectedOrder = row;
      this.billService.getbBillableOrdersByOrderAutoid(row.order_autoid).subscribe(response => {
        this.jobDetails = response.data;
      });
    }
  }
}
