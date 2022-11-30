import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-extra-gold-add',
  templateUrl: './extra-gold-add.component.html',
  styleUrls: ['./extra-gold-add.component.scss']
})
export class ExtraGoldAddComponent implements OnInit {
  goldAddForm: FormGroup;

  constructor() {
    this.goldAddForm = new FormGroup({
      jobId: new FormControl(null),
      gold: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

}
