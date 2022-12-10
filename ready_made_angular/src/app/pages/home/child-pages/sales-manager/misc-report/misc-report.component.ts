import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-misc-report',
  templateUrl: './misc-report.component.html',
  styleUrls: ['./misc-report.component.scss']
})
export class MiscReportComponent implements OnInit {
  isProduction: boolean = environment.production;
  subject = 'Misc Reports';
  constructor() { }

  ngOnInit(): void {
  }

}
