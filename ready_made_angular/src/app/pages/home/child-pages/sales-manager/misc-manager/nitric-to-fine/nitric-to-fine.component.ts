import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-nitric-to-fine',
  templateUrl: './nitric-to-fine.component.html',
  styleUrls: ['./nitric-to-fine.component.scss']
})
export class NitricToFineComponent implements OnInit {
  isProduction = environment.production;
  showDeveloperDiv = false;
  nitricToFineForm: FormGroup;
  constructor() {
    this.nitricToFineForm = new FormGroup({
      nitric_value: new FormControl(0, [Validators.required]),
      fine_value: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  resetForm() {

  }

  saveConversion() {

  }
}
