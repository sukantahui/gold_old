import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ManagerService} from '../../../../../../services/manager.service';

@Component({
  selector: 'app-dal-creation',
  templateUrl: './dal-creation.component.html',
  styleUrls: ['./dal-creation.component.scss']
})
export class DalCreationComponent implements OnInit {
  isProduction = environment.production;
  showDeveloperDiv = false;
  karigars: any[];
  user: any;
  materialBalance: any[];
  SavedResponse: any[];
  constructor(private route: ActivatedRoute, private http: HttpClient, private managerService: ManagerService) {
    this.route.data.subscribe((response: any) => {
      this.materialBalance = response.fineToNinetyTwoResolver.materialBalance.data;
      this.user = response.fineToNinetyTwoResolver.user;
      this.karigars = response.fineToNinetyTwoResolver.karigars.data;
      // console.log(response.fineToNinetyTwoResolver.user);
    });
  }

  ngOnInit(): void {
  }

}
