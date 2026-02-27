<?php

namespace App\Http\Controllers;

use App\Models\MonthlyTransaction;
use App\Http\Requests\StoreMonthlyTransactionRequest;
use App\Http\Requests\UpdateMonthlyTransactionRequest;
use Illuminate\Support\Facades\DB;

class MonthlyTransactionController  extends ApiController
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMonthlyTransactionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMonthlyTransactionRequest $request)
    {
        DB::beginTransaction();

        try {

            $record=MonthlyTransaction::upsert(
                $request->records,
                ['transaction_particular_id', 'rm_id', 'record_year', 'record_month'],
                ['value', 'fine', 'cash', 'comment', 'tr_date', 'tr_type', 'updated_at']
            );

            DB::commit();
            return $this->successResponse($record,'Monthly transactions saved successfully');

        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json([
                'message' => 'Error saving records',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MonthlyTransaction  $monthlyTransaction
     * @return \Illuminate\Http\Response
     */
    public function show(MonthlyTransaction $monthlyTransaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MonthlyTransaction  $monthlyTransaction
     * @return \Illuminate\Http\Response
     */
    public function edit(MonthlyTransaction $monthlyTransaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMonthlyTransactionRequest  $request
     * @param  \App\Models\MonthlyTransaction  $monthlyTransaction
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMonthlyTransactionRequest $request, MonthlyTransaction $monthlyTransaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MonthlyTransaction  $monthlyTransaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(MonthlyTransaction $monthlyTransaction)
    {
        //
    }
}
