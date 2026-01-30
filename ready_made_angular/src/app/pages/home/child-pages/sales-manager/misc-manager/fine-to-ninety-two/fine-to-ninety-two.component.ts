import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ManagerService} from '../../../../../../services/manager.service';
import Swal from 'sweetalert2';
import {Stock} from '../../../../../../models/stock.model';

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
  extraCopperValue: number;
  SavedResponse: any;
  showDeveloperDiv = false;
  nittiTotal: number;
  constructor(private route: ActivatedRoute, private http: HttpClient, private managerService: ManagerService ) {
    this.route.data.subscribe((response: any) => {
      this.materialBalance = response.fineToNinetyTwoResolver.materialBalance.data;
      this.user = response.fineToNinetyTwoResolver.user.data;
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
      copper_value: new FormControl({value: 0, disables: false}, [Validators.required]),
      gini_value: new FormControl({value: 0, disabled: false}, [Validators.required, Validators.min(0.001)])

    });
  }

  ngOnInit(): void {

  }


  onFineGoldChange(fineGoldValue: HTMLInputElement, copperValue: HTMLInputElement) {

      const fine = this.projectDetails.fineToNinetyTwoRatio.fine;
      const copper = this.projectDetails.fineToNinetyTwoRatio.copper;
      this.extraCopperValue = Number(fineGoldValue.value) * 0.001;
    // @ts-ignore
      this.expectedCopperValue = Number((fineGoldValue.value * (copper / fine) + this.extraCopperValue).toFixed(3));
      this.goldConversionForm.patchValue({copper_value: this.expectedCopperValue.toFixed(3)});
      this.expectedGiniValue = Number(fineGoldValue.value) + this.expectedCopperValue - this.extraCopperValue;
      this.goldConversionForm.patchValue({gini_value: this.expectedGiniValue.toFixed(3)});
      this.nittiTotal = Number((Number(fineGoldValue.value) + Number(copperValue.value)).toFixed(3));
  }

  onCopperChange(fineGoldValue: HTMLInputElement, copperValue: HTMLInputElement) {
    this.expectedGiniValue = Number((Number(fineGoldValue.value) + Number(copperValue.value)).toFixed(3));
    this.goldConversionForm.patchValue({gini_value: this.expectedGiniValue});
    this.nittiTotal = Number((Number(fineGoldValue.value) + Number(copperValue.value)).toFixed(3));
  }

  resetForm() {
    if (this.SavedResponse){
      this.materialBalance = this.SavedResponse.data.material_balance;
      this.SavedResponse = null;
    }
    this.goldConversionForm.reset();
    // this.goldConversionForm.patchValue({fine_gold_value: 0});
    // this.goldConversionForm.patchValue({copper_value: 0});
    // this.goldConversionForm.patchValue({gini_value: 0});
    // this.goldConversionForm.patchValue({karigar_id: null});
  }

  saveGoldConversion() {
    Swal.fire({
      title: 'Fine to 92 Conversion',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Convert',
      cancelButtonText: 'No!',
      background: 'rgba(38,39,47,0.95)'
    }).then((result) => {
      if (result.value){
        this.managerService.saveFineToNinetyTwo(this.goldConversionForm.value).subscribe((response: {status: any , data: any}) => {
          if (response.status === true) {
            Swal.fire({
              timer: 2000,
              title: 'Saved',
              text: 'Converted successfully',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#1661a0',
              cancelButtonColor: '#d33',
              background: 'rgba(38,39,47,0.95)'
            });
            this.SavedResponse = response;
            this.goldConversionForm.reset();
          }
        }, error => {
          console.log(error);
          Swal.fire({
            title: error.message,
            text: 'Conversion unsuccessful',
            icon: 'error',
            showConfirmButton: false,
            background: 'rgba(38,39,47,0.95)',
            timer: 3000
          });
        });
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelled',
        );
      }
    });

    // -------------
    // this.managerService.saveFineToNinetyTwo(this.goldConversionForm.value).subscribe(response => {
    //   this.SavedResponse = response;
    // });
  }
}
