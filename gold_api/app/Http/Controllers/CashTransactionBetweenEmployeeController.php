<?php

namespace App\Http\Controllers;

use App\Models\CashTransactionBetweenEmployee;
use App\Http\Requests\StoreCashTransactionBetweenEmployeeRequest;
use App\Http\Requests\UpdateCashTransactionBetweenEmployeeRequest;
use App\Models\Maxtable;
use App\Models\EmployeeCashBalance;
use Illuminate\Support\Facades\Auth;

class CashTransactionBetweenEmployeeController extends  ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    protected function updateCashBalance($empId, $transactionType, $amount)
    {
        $cashBalance = EmployeeCashBalance::firstOrNew(['emp_id' => $empId]);

        // initialize if new
        if (!$cashBalance->exists) {
            $cashBalance->op_balance = 0;
            $cashBalance->inward = 0;
            $cashBalance->outward = 0;
            $cashBalance->balance = 0;
        }

        if ($transactionType === 1) { // inward
            $cashBalance->inward += $amount;
            $cashBalance->balance += $amount;
        } elseif ($transactionType === -1) { // outward
            $cashBalance->outward += $amount;
            $cashBalance->balance -= $amount;
        }

        $cashBalance->tr_date = now();
        $cashBalance->save();
    }
    public function store(StoreCashTransactionBetweenEmployeeRequest $request)
    {
        $accounting_year = get_accounting_year();
        $maxTable = Maxtable::firstOrCreate(
            ['table_name' => 'cash_transaction_between_employees', 'financial_year' => $accounting_year],
            ['prefix' => 'CTR', 'suffix' => 'None', 'mainfield' => 0]
        );

        $maxTable->increment('mainfield'); // atomically increases mainfield by 1

        $cash_transaction_id = $maxTable->prefix . '/' . $maxTable->mainfield . '/' . $maxTable->financial_year;


        // Create new transaction
        $transaction = new CashTransactionBetweenEmployee();

        // Generate unique transaction ID (if not provided)
        $transaction->cash_transaction_id = $cash_transaction_id;

        $transaction->payee_id   = $request->payee_id;
        $transaction->payer_id   = $request->payer_id;
        $transaction->cash       = $request->cash;
        $transaction->tr_date    = $request->tr_date ?? now();
        $transaction->comment    = $request->comment;

        $transaction->save();

        // ✅ Update Cash Balances
        // Inward for payee
        $this->updateCashBalance($request->payee_id, 1, $request->cash);

        // Outward for payer
        $this->updateCashBalance($request->payer_id, -1, $request->cash);

        return $this->successResponse($transaction);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CashTransactionBetweenEmployee  $cashTransactionBetweenEmployee
     * @return \Illuminate\Http\Response
     */
    public function show(CashTransactionBetweenEmployee $cashTransactionBetweenEmployee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CashTransactionBetweenEmployee  $cashTransactionBetweenEmployee
     * @return \Illuminate\Http\Response
     */
    public function edit(CashTransactionBetweenEmployee $cashTransactionBetweenEmployee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCashTransactionBetweenEmployeeRequest  $request
     * @param  \App\Models\CashTransactionBetweenEmployee  $cashTransactionBetweenEmployee
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCashTransactionBetweenEmployeeRequest $request, CashTransactionBetweenEmployee $cashTransactionBetweenEmployee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CashTransactionBetweenEmployee  $cashTransactionBetweenEmployee
     * @return \Illuminate\Http\Response
     */
    public function destroy(CashTransactionBetweenEmployee $cashTransactionBetweenEmployee)
    {
        //
    }
}
