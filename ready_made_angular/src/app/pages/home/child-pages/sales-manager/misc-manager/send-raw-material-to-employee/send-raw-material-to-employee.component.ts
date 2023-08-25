import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {ManagerService} from '../../../../../../services/manager.service';

@Component({
  selector: 'app-send-raw-material-to-employee',
  templateUrl: './send-raw-material-to-employee.component.html',
  styleUrls: ['./send-raw-material-to-employee.component.scss']
})
export class SendRawMaterialToEmployeeComponent implements OnInit {
  resolverValues: any;
  isProduction = environment.production;
  showDeveloperDiv: boolean;
  employees: any;
  selectableEmployees: null;
  projectDetails: any;
  materialSendingForm: FormGroup;
  user: any;
  rawMaterials: any;
  selectableMaterials: any[];
  private savedResponse: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private managerService: ManagerService) {
    this.route.data.subscribe((response: any) => {
      this.user = response.materialResolver.user;
      this.resolverValues = response.materialResolver;
      this.employees = response.materialResolver.employees.data;
      this.projectDetails = response.materialResolver.projectDetails;
      this.rawMaterials = response.materialResolver.rawMaterials.data;
      // tslint:disable-next-line:max-line-length
      this.selectableEmployees = this.employees.filter(emp => this.projectDetails.managerToEmployeeMaterial.employees.find(rm => (rm === emp.employeeId )));
      // tslint:disable-next-line:max-line-length
      this.selectableMaterials = this.rawMaterials.filter(rm => this.projectDetails.managerToEmployeeMaterial.materialsToSend.find(selectableRm => (selectableRm === rm.rmID )));
      // this.selectableEmployees = null;
    });
    this.materialSendingForm = new FormGroup({
      outward_employee_id: new FormControl(this.user.emp_id, [Validators.required]),
      inward_employee_id: new FormControl(null, [Validators.required]),
      rm_id: new FormControl(null, [Validators.required]),
      value: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }


  saveMaterialTransfer() {
    Swal.fire({
      title: 'Dal Creation',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Convert',
      cancelButtonText: 'No!',
      background: 'rgba(38,39,47,0.95)'
    }).then((result) => {
      if (!result.value){return;}
      // here API call to save the data
      this.managerService.saveMaterialTransfer(this.materialSendingForm.value).subscribe((response: {status: any , data: any}) => {
        // when saved record successfully
        if (response.status === true) {
          Swal.fire({
            timer: 2000,
            title: 'Saved',
            text: 'Transferred successfully',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#1661a0',
            cancelButtonColor: '#d33',
            background: 'rgba(38,39,47,0.95)'
          });
          this.savedResponse = response;
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
