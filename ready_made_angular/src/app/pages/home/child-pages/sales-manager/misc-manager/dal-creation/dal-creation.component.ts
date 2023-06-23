import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ManagerService} from '../../../../../../services/manager.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  projectDetails: any;
  dalConversionForm: FormGroup;
  dalCreationRation: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private managerService: ManagerService) {
    this.route.data.subscribe((response: any) => {
      this.materialBalance = response.fineToNinetyTwoResolver.materialBalance.data;
      this.user = response.fineToNinetyTwoResolver.user;
      this.karigars = response.fineToNinetyTwoResolver.karigars.data;
      // console.log(response.fineToNinetyTwoResolver.user);
    });
    this.http.get('assets/projectDetails.json').subscribe((data: any) => {
      this.projectDetails = data;
      this.dalCreationRation = this.projectDetails.dalCreationRation;
    });
    this.dalConversionForm = new FormGroup({
      employee_id: new FormControl(this.user.emp_id, [Validators.required]),
      karigar_id: new FormControl(null, [Validators.required]),

      silver_id: new FormControl(38, [Validators.required]),
      copper_id: new FormControl(37, [Validators.required]),
      zinc_id: new FormControl(39, [Validators.required]),
      dal_id: new FormControl(33, [Validators.required]),

      silver_value: new FormControl(0, [Validators.required]),
      copper_value: new FormControl({value: 0, disables: false}, [Validators.required]),
      zinc_value: new FormControl({value: 0, disables: false}, [Validators.required]),
      dal_value: new FormControl({value: 0, disabled: false}, [Validators.required, Validators.min(0.001)])
    });
  }



  ngOnInit(): void {
  }

  onSilverChange(silverValue: HTMLInputElement) {
    const copperValue =  Number(silverValue.value) * this.dalCreationRation.copperToSilverRatio;
    this.dalConversionForm.patchValue({copper_value: copperValue});

    const zincValue =  Number(silverValue.value) * this.dalCreationRation.zincToSilver;
    this.dalConversionForm.patchValue({zinc_value: zincValue});

    const dalValue =  Number(silverValue.value) * this.dalCreationRation.dalToSilverRatio;
    this.dalConversionForm.patchValue({dal_value: dalValue});

  }
}
