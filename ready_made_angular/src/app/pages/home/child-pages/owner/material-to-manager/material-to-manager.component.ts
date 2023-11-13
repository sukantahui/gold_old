import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ManagerService} from '../../../../../services/manager.service';
import {CommonService} from '../../../../../services/common.service';

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
  savedResponse: { status: any; message: string; data: object };
  managerMaterialBalanceUpdated: any;
  managerMaterialBalance: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private managerService: ManagerService) {
    this.route.data.subscribe((response: any) => {
      this.materials = response.materialResolver.rawMaterials.data;
      this.managerMaterialBalance = response.materialResolver.managerMaterialBalance.data;
    });
    this.ownerToMangerForm = new FormGroup({
      rm_id: new FormControl(36, [Validators.required]),
      value: new FormControl({value: 0, disabled: false}, [Validators.required, Validators.min(0.001)])
    });
  }

  ngOnInit(): void {
  }

  resetForm() {

  }

  saveTransfer() {
    Swal.fire({
      title: 'From owner to Manager',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Transfer',
      cancelButtonText: 'No!',
      background: 'rgba(38,39,47,0.95)'
    }).then((result) => {
      if (!result.value){return;}
      // here API call to save the data
      this.managerService.saveMaterialFromOwnerToManager(this.ownerToMangerForm.value).subscribe((response: {status: any, message: string , data: any}) => {
        // when saved record successfully
        if (response.status === true) {
          Swal.fire({
            timer: 2000,
            title: 'Saved',
            text: 'Transferred successfully to Manager',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#1661a0',
            cancelButtonColor: '#d33',
            background: 'rgba(38,39,47,0.95)'
          });
          this.savedResponse = response;
          this.managerMaterialBalanceUpdated = response.data.manager_all_material_balance;
        }
      }, error => {
        // error saving record
        Swal.fire({
          title: error.message,
          text: 'Transfer unsuccessful',
          icon: 'error',
          showConfirmButton: false,
          background: 'rgba(38,39,47,0.95)',
          timer: 3000
        });
      });
    });
  }
}
