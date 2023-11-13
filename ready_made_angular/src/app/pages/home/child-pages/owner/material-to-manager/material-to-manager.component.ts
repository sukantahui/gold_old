import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-material-to-manager',
  templateUrl: './material-to-manager.component.html',
  styleUrls: ['./material-to-manager.component.scss']
})
export class MaterialToManagerComponent implements OnInit {
  isProduction = environment.production;
  materials: any;
  showDeveloperDiv = true;
  ownerToMangerForm: FormGroup;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.data.subscribe((response: any) => {
      this.materials = response.materialResolver.rawMaterials.data;
    });
    this.ownerToMangerForm = new FormGroup({
      rm_id: new FormControl(36, [Validators.required]),
      rm_value: new FormControl({value: 0, disabled: false}, [Validators.required, Validators.min(0.001)])
    });
  }

  ngOnInit(): void {
  }

  resetForm() {

  }

  saveTransfer() {

  }
}
