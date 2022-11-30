import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {
  isProduction: boolean = environment.production;
  subject = 'Developer Area';
  constructor() { }

  ngOnInit(): void {
  }

}
