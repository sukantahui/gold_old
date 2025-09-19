import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ManagerService} from '../../../../../../services/manager.service';
import Swal from 'sweetalert2';

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
  managerMaterialBalance: any[];
  savedResponse: { status: any; data: any };
  projectDetails: any;
  panConversionForm: FormGroup;
  materialBalanceUpdated: any;
  panCreationRation: any;
  giniPlusDal: number;

  constructor(private route: ActivatedRoute, private http: HttpClient, private managerService: ManagerService) {
    this.route.data.subscribe((response: any) => {
      this.managerMaterialBalance = response.panCreationResolver.managerMaterialBalance.data;
      this.user = response.panCreationResolver.user;
      this.karigars = response.panCreationResolver.karigars.data;
    });
    this.http.get('assets/projectDetails.json').subscribe((data: any) => {
      this.projectDetails = data;
      this.panCreationRation = this.projectDetails.panCreationRation;
      console.log(this.projectDetails.panCreationRation);
    });

    this.panConversionForm = new FormGroup({
      karigar_id: new FormControl(76, [Validators.required]),
      ninety_two_gini_value: new FormControl(0, [Validators.required,  Validators.min(0.001)]),
      zinc_value: new FormControl(0, [Validators.required, Validators.min(0.001)]),
      dal_value: new FormControl(0, [Validators.required, Validators.min(0.001)]),
      pan_value: new FormControl(0, [Validators.required, Validators.min(0.001)])
    });
  }

  ngOnInit(): void {
    this.panConversionForm.valueChanges.subscribe(values => {
      const gini = +values.ninety_two_gini_value || 0;
      const dal = +values.dal_value || 0;
      const zinc = +values.zinc_value || 0;
      this.giniPlusDal = gini + dal;
    });
  }

  onGiniChange(giniValue: HTMLInputElement) {
    const gini =  +giniValue.value || 0;
    const dal = gini * this.panCreationRation.dalToGini;
    this.panConversionForm.patchValue({dal_value: dal.toFixed(3)});

    const zinc = (gini + dal) * this.panCreationRation.zincToDalAndGini;
    this.panConversionForm.patchValue({zinc_value: zinc.toFixed(3)});
    const pan = (gini + dal + zinc);
    this.panConversionForm.patchValue({pan_value: pan.toFixed(3)});
  }
  onDalChange(dalValue: HTMLInputElement) {
    const gini = Number(this.panConversionForm.get('ninety_two_gini_value')?.value) || 0;
    const dal = +dalValue.value || 0;
    const zinc = (gini + dal) * this.panCreationRation.zincToDalAndGini;
    this.panConversionForm.patchValue({zinc_value: zinc.toFixed(3)});
    const pan = (gini + dal + zinc);
    this.panConversionForm.patchValue({pan_value: pan.toFixed(3)});
  }
  onZincChange(zincValue: HTMLInputElement) {
    const gini = Number(this.panConversionForm.get('ninety_two_gini_value')?.value) || 0;
    const dal = Number(this.panConversionForm.get('dal_value')?.value) || 0;
    const zinc = +zincValue.value || 0;
    const pan = (gini + dal + zinc);
    this.panConversionForm.patchValue({pan_value: pan.toFixed(3)});
  }

  resetForm() {
    if (this.savedResponse){
      this.managerMaterialBalance = this.savedResponse.data.material_balance;
      this.savedResponse = null;
    }
    this.panConversionForm.reset();
  }

  savePanConversion() {
    Swal.fire({
      title: 'Pan Creation',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Convert',
      cancelButtonText: 'No!',
      background: 'rgba(38,39,47,0.95)'
    }).then((result) => {
      if (!result.value){return;}
      // here API call to save the data
      this.managerService.savePanCreation(this.panConversionForm.value).subscribe((response: {status: any , data: any}) => {
        // when saved record successfully
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
          this.savedResponse = response;
          this.materialBalanceUpdated = response.data.material_balance;
          this.panConversionForm.markAsPristine();
        }
      }, error => {
        // error saving record
        Swal.fire({
          title: error.message,
          text: 'Conversion unsuccessful',
          icon: 'error',
          showConfirmButton: false,
          background: 'rgba(38,39,47,0.95)',
          timer: 3000
        });
      });
    });
  }



}
