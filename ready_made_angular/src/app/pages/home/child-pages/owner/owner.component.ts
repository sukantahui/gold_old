import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ManagerService} from '../../../../services/manager.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  isProduction = environment.production;
  subject = 'Owner Area';

  constructor() {
  }

  ngOnInit(): void {
  }

}
