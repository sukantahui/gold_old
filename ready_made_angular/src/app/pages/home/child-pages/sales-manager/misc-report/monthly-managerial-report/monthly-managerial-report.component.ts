import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {ManagerService} from '../../../../../../services/manager.service';

@Component({
  selector: 'app-monthly-managerial-report',
  templateUrl: './monthly-managerial-report.component.html',
  styleUrls: ['./monthly-managerial-report.component.scss']
})
export class MonthlyManagerialReportComponent implements OnInit {

  selectedYear: number | null = null;
  selectedMonth: number | null = null;

  years: number[] = [];
  NinetyTwoGoldForm!: FormGroup;

  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];

  constructor(
      private fb: FormBuilder,
      private managerService: ManagerService
  ) {}

  ngOnInit(): void {

    // Generate year list (current year to last 10 years)
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;

    for (let i = currentYear; i >= currentYear - 10; i--) {
      this.years.push(i);
    }

    this.initializeForm();
  }

  // Initialize form with 4 fixed rows
  initializeForm(): void {
    this.NinetyTwoGoldForm = this.fb.group({
      row1: this.createRow(1, 1), // Opening Balance
      row2: this.createRow(2, -1), // Transferred to Pitam
      row3: this.createRow(3, 1), // Returned from Pitam
      row4: this.createRow(4, -1)  // Fine Converted
    });
  }

  // Create each row
  createRow(transactionParticularId: number, trType: number): FormGroup {
    const group = this.fb.group({
      transaction_particular_id: [transactionParticularId],
      value: [0],
      fine: [{ value: 0, disabled: true }], // readonly
      cash: [0],
      rm_id: [48],
      comment: [''],
      tr_date: [new Date().toISOString().substring(0, 10)],
      tr_type: [trType] // dynamic
    });

    // Auto calculate fine when value changes
    group.get('value')?.valueChanges.subscribe(val => {
      const fineValue = (Number(val) || 0) * 0.92;
      group.get('fine')?.setValue(fineValue.toFixed(2), { emitEvent: false });
    });

    return group;
  }

  // Submit data
  submit(): void {

    if (!this.selectedYear || !this.selectedMonth) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Selection',
        text: 'Please select year and month'
      });
      return;
    }

    const formData = this.NinetyTwoGoldForm.getRawValue();

    const payload = {
      records: Object.values(formData).map((row: any) => ({
        ...row,
        record_year: this.selectedYear,
        record_month: this.selectedMonth
      }))
    };


    // ✅ Remove focus before modal logic continues, to prevent warning
    (document.activeElement as HTMLElement)?.blur();
    // 🔥 Confirmation Dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save these monthly transactions?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save it!'
    }).then((result) => {


      if (result.isConfirmed) {

        // Optional loading state
        Swal.fire({
          title: 'Saving...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        this.managerService.saveMonthlyTransactions(payload)
            .subscribe({
              next: (res: any) => {

                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: res.message || 'Monthly transactions saved successfully',
                  timer: 2000,
                  showConfirmButton: false
                });

              },
              error: (err) => {

                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: err.error?.message || 'Something went wrong'
                });

              }
            });
      }

    });
  }
}
