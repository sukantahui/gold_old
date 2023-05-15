import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

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
  projectDetails: any;
  expectedCopperValue: any;
  expectedGiniValue: any;

  constructor(private route: ActivatedRoute, private http: HttpClient ) {
    this.route.data.subscribe((response: any) => {
      this.materialBalance = response.fineToNinetyTwoResolver.materialBalance.data;
      this.user = response.fineToNinetyTwoResolver.user;
      this.karigars = response.fineToNinetyTwoResolver.karigars.data;
      // console.log(response.fineToNinetyTwoResolver.user);
    });
    this.http.get('assets/projectDetails.json').subscribe((data: any) => {
      this.projectDetails = data;
    });
    this.goldConversionForm = new FormGroup({
      employee_id: new FormControl(this.user.emp_id, [Validators.required]),
      karigar_id: new FormControl(null, [Validators.required]),

      fine_gold_id: new FormControl(36, [Validators.required]),
      copper_id: new FormControl(37, [Validators.required]),
      gini_id: new FormControl(48, [Validators.required]),

      fine_gold_value: new FormControl(0, [Validators.required]),
      copper_value: new FormControl(0, [Validators.required]),
      gini_value: new FormControl(0, [Validators.required, Validators.min(0.001)])

    });
  }

  ngOnInit(): void {

  }


  onFineGoldChange(fineGoldValue: HTMLInputElement, copperValue: HTMLInputElement) {
      console.log(fineGoldValue.value);
      const fine = this.projectDetails.fineToNinetyTwoRatio.fine;
      const copper = this.projectDetails.fineToNinetyTwoRatio.copper;
      // @ts-ignore
      this.expectedCopperValue = Number((fineGoldValue.value * (copper / fine)).toFixed(3));
      this.goldConversionForm.patchValue({copper_value: this.expectedCopperValue});
      this.expectedGiniValue = Number(fineGoldValue.value) + this.expectedCopperValue;
      this.goldConversionForm.patchValue({gini_value: this.expectedGiniValue});
  }

  onCopperChange(fineGoldValue: HTMLInputElement, copperValue: HTMLInputElement) {
    this.expectedGiniValue = Number((Number(fineGoldValue.value) + Number(copperValue.value)).toFixed(3));
    this.goldConversionForm.patchValue({gini_value: this.expectedGiniValue});
  }

  resetForm() {

  }

  saveGoldConversion() {

  }
}
