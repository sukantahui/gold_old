import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {environment} from '../../../../../../../../environments/environment';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ManagerService} from '../../../../../../../services/manager.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-fine-gold-form',
  templateUrl: './fine-gold-form.component.html',
  styleUrls: ['./fine-gold-form.component.scss']
})
export class FineGoldFormComponent implements OnInit, OnChanges {
  @Input() selectedYear!: number;
  @Input() selectedMonth!: number;
  private rmId = 36;
  isDev = environment.production === false;
  FineGoldForm: FormGroup;
  private isLoading = false;

  constructor(
      private fb: FormBuilder,
      private managerService: ManagerService
  ) {}

  createRow(transactionParticularId: number, trType: number, order_no: number , comment = ''): FormGroup {


    const group = this.fb.group({
      transaction_particular_id: [transactionParticularId],
      value: [0],
      fine: [{ value: 0, disabled: true }],
      cash: [0],
      rm_id: [48],
      comment: [comment],
      tr_date: [new Date().toISOString().substring(0, 10)],
      tr_type: [trType],
      order_no: [order_no]
    });

    group.get('value')?.valueChanges.subscribe(val => {

      const value = Number(val) || 0;

      const fineValue = value * 0.92;

      group.get('fine')?.setValue(
          this.format3(fineValue),
          { emitEvent: false }
      );

    });

    return group;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
        (changes.selectedYear || changes.selectedMonth) &&
        this.selectedYear &&
        this.selectedMonth
    ) {
      this.loadMonthlyFineData();
    }
  }

  initializeForm(): void {
    this.FineGoldForm = this.fb.group({
      closingBalanceOfPreviousMonth: this.createRow(2, 1, 0, 'Opening Balance'),   // closing balance
      // row2: this.createRow(2, -1),  // Opening Balance
      transferredToProduction: this.createRow(3, -1, 10),  // Trnasfer to Pitam
      returnedFromProduction: this.createRow(4, 1, 20),   // Returned from Pitam
      fineToGini: this.createRow(5, -1, 30),  // From Fine to 92
      fromGiniToFine: this.createRow(6, 1, 40),  // From 92 to Fine
      lossOfFine: this.createRow(7, -1, 50, 'Manual Entry'),  // Loss of Gini
      excessOfFine: this.createRow(8, 1, 60, 'Manual Entry'),  // Loss of Gini
      closingBalance: this.fb.group({
        transaction_particular_id: [1],
        value: [{ value: 0, disabled: true }],
        fine: [{ value: 0, disabled: true }],
        cash: [0],
        rm_id: [36],
        comment: ['Closing Balance (Auto calculated)'],
        tr_date: [new Date().toISOString().substring(0, 10)],
        tr_type: [1],
        order_no: [70]
      })
    });

  }

  // helper methods
  format3(value: any) {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    return Number(value).toFixed(3);
  }

  loadMonthlyFineData(): void {
    this.isLoading = true;
    const payload = {
      rmId: this.rmId,
      recordYear: this.selectedYear,
      recordMonth: this.selectedMonth
    };

    forkJoin({
      closing: this.managerService.getMonthlyTransactionClosingBalance(payload),
      transfer: this.managerService.getMonthlyTotalMaterialFromManagerToProductionManager(payload),
      return: this.managerService.getMonthlyTotalMaterialFromProductionManagerToManager(payload),
      fineToGini: this.managerService.getMonthlyTotalFineToGiniByManager({
        fromRmId: 36, toRmId: 48, ...payload
      }),
      giniToFine: this.managerService.getMonthlyTotalFineToGiniByManager({
        fromRmId: 48, toRmId: 36, ...payload
      })
    }).subscribe({
      next: (res) => {

        console.log('✅ All APIs loaded:', res);

        // 1️⃣ Opening Balance
        const closing = (res.closing as any)?.data?.value || 0;
        this.FineGoldForm.get('closingBalanceOfPreviousMonth')?.patchValue({
          value: this.format3(closing),
          fine: this.format3(closing * 1)
        });

        // 2️⃣ Transfer
        const transfer = res.transfer?.data?.value || 0;
        this.FineGoldForm.get('transferredToProduction')?.patchValue({
          value: this.format3(transfer),
          fine: this.format3(transfer * 1)
        });

        // 3️⃣ Return
        const returned = res.return?.data?.value || 0;
        this.FineGoldForm.get('returnedFromProduction')?.patchValue({
          value: this.format3(returned),
          fine: this.format3(returned * 1)
        });

        // 4️⃣ Fine → Gini
        this.FineGoldForm.get('fineToGini')?.patchValue({
          value: this.format3(res.fineToGini?.data?.fromRmTotal || 0),
          fine: this.format3(res.fineToGini?.data?.fromRmTotal || 0),
          comment: res.fineToGini?.data?.conversionComment
        });

        // 5️⃣ Gini → Fine
        this.FineGoldForm.get('fromGiniToFine')?.patchValue({
          value: this.format3(res.giniToFine?.data?.toRmTotal || 0),
          fine: this.format3(res.giniToFine?.data?.fromRmTotal || 0)
        });

        // ✅ Now safe to calculate
        //this.calculateClosingBalance();
      },

      error: (err) => {
        console.error('❌ API Error:', err);
        Swal.fire('Error', 'Failed to load monthly data', 'error');
      }
    });
  }
}
