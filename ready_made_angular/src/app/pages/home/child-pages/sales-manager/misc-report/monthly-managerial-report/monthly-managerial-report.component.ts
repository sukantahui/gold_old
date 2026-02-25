import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
      private http: HttpClient
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
      alert('Please select year and month');
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

    console.log('Sending Payload:', payload);

    this.http.post('http://your-api-url/api/transaction-records', payload)
        .subscribe({
          next: (res) => {
            alert('Data saved successfully');
            console.log(res);
          },
          error: (err) => {
            console.error(err);
            alert('Error saving data');
          }
        });
  }
}
