import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-send-to-job',
  templateUrl: './send-to-job.component.html',
  styleUrls: ['./send-to-job.component.scss']
})
export class SendToJobComponent implements OnInit {
  isProduction = environment.production;
  showDeveloperDiv = false;
  constructor() { }

  ngOnInit(): void {
  }

}
