import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-dal-creation',
  templateUrl: './dal-creation.component.html',
  styleUrls: ['./dal-creation.component.scss']
})
export class DalCreationComponent implements OnInit {
  isProduction = environment.production;
    showDeveloperDiv = false;
  constructor() { }

  ngOnInit(): void {
  }

}
