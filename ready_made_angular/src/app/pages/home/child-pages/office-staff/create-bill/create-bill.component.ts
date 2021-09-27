import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {
  isProduction = environment.production;
  constructor() { }

  ngOnInit(): void {
  }

}
