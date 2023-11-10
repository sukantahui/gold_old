import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-pan-creation',
  templateUrl: './pan-creation.component.html',
  styleUrls: ['./pan-creation.component.scss']
})
export class PanCreationComponent implements OnInit {
  isProduction = environment.production;
  showDeveloperDiv = false;
  karigars: any[];
  user: any;
  materialBalance: any[];
  savedResponse: { status: any; data: any };
  projectDetails: any;
  constructor() { }

  ngOnInit(): void {
  }

}
