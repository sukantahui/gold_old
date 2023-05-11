import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fine-to-ninety-two',
  templateUrl: './fine-to-ninety-two.component.html',
  styleUrls: ['./fine-to-ninety-two.component.scss']
})
export class FineToNinetyTwoComponent implements OnInit {
  materialBalance: any[];
  isProduction = environment.production;
  goldConversionForm: FormGroup;
  user: any;
  karigars: any;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.materialBalance = response.fineToNinetyTwoResolver.materialBalance.data;
      this.user = response.fineToNinetyTwoResolver.user;
      this.karigars = response.fineToNinetyTwoResolver.karigars.data;
      // console.log(response.fineToNinetyTwoResolver.user);
    });
    this.goldConversionForm = new FormGroup({
      employee_id: new FormControl(this.user.emp_id, [Validators.required]),
      karigar_id: new FormControl(null, [Validators.required]),

      fine_gold_id: new FormControl(36, [Validators.required]),
      copper_id: new FormControl(37, [Validators.required]),
      gini_id: new FormControl(48, [Validators.required]),

      fine_gold_value: new FormControl(0, [Validators.required]),
      copper_value: new FormControl(0, [Validators.required]),
      gini_value: new FormControl(0, [Validators.required])

    });
  }

  ngOnInit(): void {

  }


}
