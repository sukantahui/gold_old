import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-withdraw-by-owner',
  templateUrl: './withdraw-by-owner.component.html',
  styleUrls: ['./withdraw-by-owner.component.scss']
})
export class WithdrawByOwnerComponent implements OnInit {
  isProduction: boolean = environment.production;
  constructor() { }

  ngOnInit(): void {
  }

  showRecord() {

  }
}
