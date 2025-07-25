<?php

namespace App\Http\Controllers;

use App\Models\GpTransaction;
use App\Http\Requests\StoreGpTransactionRequest;
use App\Http\Requests\UpdateGpTransactionRequest;

class GpTransactionController extends ApiController
{


    public function store(StoreGpTransactionRequest $request)
    {
        $transaction = new GpTransaction();
        $transaction->comment = $request->input('particulars', 'GP Used');
        $transaction->transaction_date = $request->input('transaction_date', now()->toDateString());
        $transaction->gp_value = $request->input('gp_value');
        $transaction->gp_transaction_type_id = $request->input('gp_transaction_type_id');
        $transaction->save();
        return $this->successResponse($transaction);
    }


    public function getCurrentBalance()
    {
        $totalBalance = GpTransaction::join('gp_transaction_types', 'gp_transactions.gp_transaction_type_id', '=', 'gp_transaction_types.id')
            ->selectRaw('SUM(gp_transactions.gp_value * gp_transaction_types.transaction_type_value) as balance')
            ->value('balance');

        $totalBalance = $totalBalance ?? 0;
        return $this->successResponse($totalBalance);
    }

    public function get_gp_transactions(){
        $transactions = GpTransaction::with('transactionType')->orderBy('transaction_date', 'asc')->get();

        $report = $transactions->map(function ($transaction) {
            $transactionType = $transaction->transactionType;
            $typeName = $transactionType ? $transactionType->transaction_type_name : 'Unknown';
            $typeValue = $transactionType ? $transactionType->transaction_type_value : 1;

            return [
                'Transaction Date' => $transaction->transaction_date,
                'Transaction Type' => $typeName,
                'Transaction Type Value' => $typeValue,
                'GP Value' => $transaction->gp_value,
                'Effective Value' => $transaction->gp_value * $typeValue,
                'Comment' => $transaction->comment
            ];
        });
        return $this->successResponse($report);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GpTransaction  $gpTransaction
     * @return \Illuminate\Http\Response
     */
    public function show(GpTransaction $gpTransaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GpTransaction  $gpTransaction
     * @return \Illuminate\Http\Response
     */
    public function edit(GpTransaction $gpTransaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateGpTransactionRequest  $request
     * @param  \App\Models\GpTransaction  $gpTransaction
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGpTransactionRequest $request, GpTransaction $gpTransaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GpTransaction  $gpTransaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(GpTransaction $gpTransaction)
    {
        //
    }
}
