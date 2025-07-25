import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ManagerService} from '../../../../../../services/manager.service';

@Component({
  selector: 'app-gp-transaction',
  templateUrl: './gp-transaction.component.html',
  styleUrls: ['./gp-transaction.component.scss']
})
export class GpTransactionComponent implements OnInit {
  isProduction = environment.production;
  showDeveloperDiv = false;
  gpTransactionForm: FormGroup;
  transactionTypes = [
    { id: 2, name: 'Purchased' },
    { id: 3, name: 'Brought from owner, মালিক দিয়েছে' },
    { id: 4, name: 'Used কাজে ব্যবহার করা হয়েছে' },
    { id: 5, name: 'Destroyed নষ্ট হয়ে গেছে' },
    { id: 6, name: 'Returned to owner মালিক কে ফেরত দেওয়া হয়েছে' }
  ];
  constructor(private managerService: ManagerService) {
    this.gpTransactionForm = new FormGroup({
      transaction_date: new FormControl(new Date(), [
        Validators.required,
        this.dateNotInFutureValidator
      ]),
      gp_transaction_type_id: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-6]$')  // Accepts only 1 to 6
      ]),
      gp_value: new FormControl(null, [Validators.required, Validators.min(0.001)])
    });
  }
  dateNotInFutureValidator(control: FormControl): { [key: string]: any } | null {
    const inputDate = new Date(control.value);
    const today = new Date();

    // Clear time portion to compare only dates
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return inputDate <= today ? null : { dateInFuture: true };
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.gpTransactionForm.invalid) {
      return;
    }
    const dateObj = new Date(this.gpTransactionForm.value.transaction_date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // month is 0-based
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const transactionData = {
      comment: 'Save',
      transaction_date: formattedDate,
      gp_transaction_type_id: this.gpTransactionForm.value.gp_transaction_type_id,
      gp_value: this.gpTransactionForm.value.gp_value
    };

    console.log(transactionData);
    this.managerService.saveGpTransactions(transactionData).subscribe({
      next: (response) => {
        console.log('Transaction saved successfully', response);
        alert('Transaction saved successfully!');
        this.gpTransactionForm.reset(); // Reset the form
        // Optionally set default date again:
        this.gpTransactionForm.patchValue({ transaction_date: new Date() });
      },
      error: (err) => {
        console.error('Error saving transaction:', err);
        alert('Failed to save transaction. Please try again.');
      }
    });
  }
}
