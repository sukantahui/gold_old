import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReportService} from '../../../../../services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ploss-withdrawn',
  templateUrl: './ploss-withdrawn.component.html',
  styleUrls: ['./ploss-withdrawn.component.scss']
})
export class PlossWithdrawnComponent implements OnInit {
  plossForm!: FormGroup;
  plossResponse: {status: string, total_ploss: number} = null;
  isProduction = environment.production;
  showDeveloperDiv = true;
  isSaved: boolean;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private reportService: ReportService) {
    // Access resolver data
    const response = this.route.snapshot.data.plossData;
    if (response?.status === true && response.data) {
      this.plossResponse = response.data;
    }
  }
  // @ts-ignore
  ngOnInit(): void {
    this.plossForm = this.fb.group({
      payer_id: [72, Validators.required],
      payee_id: [28],
      rm_id: [36],
      rm_quantity: [0, [Validators.required, Validators.min(0.001)]]
    });
  }
  onSubmit() {
    if (this.plossForm.valid) {
      const formData = this.plossForm.value;

      // Show confirmation before saving
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to save this Ploss withdraw entry?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Save it!',
        cancelButtonText: 'No, Cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // Proceed only if user confirms
          this.reportService.savePlossWithdraw(formData).subscribe({
            next: (response: any) => {
              void Swal.fire('✅ Success', 'Ploss withdraw saved successfully!', 'success');

              // Reset form with defaults
              this.plossForm.reset({
                payer_id: 72,
                payee_id: 28,
                rm_id: 36,
                rm_quantity: 0
              });
              this.plossForm.markAsPristine();
              this.plossForm.markAsUntouched();
            },
            error: (err) => {
              void Swal.fire('❌ Error', 'Failed to save data. Please try again.', 'error');
              console.error('Ploss Withdraw Save Error:', err);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          void Swal.fire('Cancelled', 'Operation aborted.', 'info');
        }
      });
    } else {
      void Swal.fire('⚠️ Invalid Form', 'Please fill all required fields correctly.', 'warning');
    }
  }




  resetForm() {
    this.plossForm.reset({
      payer_id: 72,
      payee_id: 28,
      rm_id: 36,
      rm_quantity: 0
    });
  }

}
