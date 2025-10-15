import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ploss-withdrawn',
  templateUrl: './ploss-withdrawn.component.html',
  styleUrls: ['./ploss-withdrawn.component.scss']
})
export class PlossWithdrawnComponent implements OnInit {
  isProduction = environment.production;
  showDeveloperDiv = true;
  plossResponse: {status: string, total_ploss: number} = null;
  constructor(private route: ActivatedRoute) {
    // Access resolver data
    const response = this.route.snapshot.data.plossData;
    if (response?.status === true && response.data) {
      this.plossResponse = response.data;
    }
  }

  ngOnInit(): void {
  }

}
