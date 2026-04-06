<?php

namespace App\Http\Controllers;

use App\Http\Resources\MonthlyTransactionResource;
use App\Models\MonthlyTransaction;
use App\Http\Requests\StoreMonthlyTransactionRequest;
use App\Http\Requests\UpdateMonthlyTransactionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MonthlyTransactionController  extends ApiController
{

    public function index()
    {
        //
    }
    public function getMonthlySavedTransaction($year, $month, $rmId)
    {
        // 🧮 Step 1: Calculate previous month
        $prevMonth = $month - 1;
        $prevYear = $year;

        if ($prevMonth == 0) {
            $prevMonth = 12;
            $prevYear = $year - 1;
        }

        // 📦 Step 2: Previous month closing → Opening balance
        $previousClosing = DB::table('monthly_transactions as mt')
            ->join('transaction_particulars as tp', 'mt.transaction_particular_id', '=', 'tp.id')
            ->where('mt.record_year', $prevYear)
            ->where('mt.record_month', $prevMonth)
            ->where('mt.rm_id', $rmId)
            ->where('mt.transaction_particular_id', 1) // closing balance
            ->select(
                'mt.id',
                'tp.transaction_particular',
                'mt.value',
                'mt.fine',
                'mt.cash',
                'mt.tr_type',
                DB::raw("'Opening Balance' as comment"),
                'mt.tr_date',
                DB::raw('0 as order_no')
            )
            ->first();

        // 📄 Step 3: Current month transactions
        $transactions = DB::table('monthly_transactions as mt')
            ->join('transaction_particulars as tp', 'mt.transaction_particular_id', '=', 'tp.id')
            ->where('mt.record_year', $year)
            ->where('mt.record_month', $month)
            ->where('mt.rm_id', $rmId)
            ->select(
                'mt.id',
                'tp.transaction_particular',
                'mt.value',
                'mt.fine',
                'mt.cash',
                'mt.tr_type',
                'mt.comment',
                'mt.tr_date',
                'mt.order_no',
                'mt.transaction_particular_id'
            )
            ->get();

        // ❌ Step 4: Remove closing balance from list
        $transactions = $transactions->filter(function ($item) {
            return $item->transaction_particular_id != 1;
        })->values();

        // 🧩 Step 5: Add opening balance at top
        if ($previousClosing) {
            $transactions->prepend($previousClosing);
        }

        // 🔽 Step 6: Sort properly
        $transactions = $transactions->sortBy('order_no')->values();

        // 📊 Step 7: Get current month closing balance (FINAL SUMMARY)
        $closingBalance = DB::table('monthly_transactions as mt')
            ->join('transaction_particulars as tp', 'mt.transaction_particular_id', '=', 'tp.id')
            ->where('mt.record_year', $year)
            ->where('mt.record_month', $month)
            ->where('mt.rm_id', $rmId)
            ->where('mt.transaction_particular_id', 1)
            ->select(
                'mt.value',
                'mt.fine',
                'mt.cash',
                'mt.comment',
                'mt.tr_date'
            )
            ->first();

        // 📤 Final Response
        return response()->json([
            'status' => true,
            'data' => $transactions,
            'closing_balance' => $closingBalance
        ]);
    }
    public function getMaterialConverted($year, $month, $fromEmployee, $fromRmId, $toRmId)
    {
        $result = DB::table('material_transformation_masters as mtm')
            ->join('material_transformation_details as from_rm', function ($join) use ($fromRmId) {
                $join->on('mtm.id', '=', 'from_rm.mtm_id')
                    ->where('from_rm.rm_id', $fromRmId)
                    ->where('from_rm.tr_type', -1);
            })
            ->join('material_transformation_details as to_rm', function ($join) use ($toRmId) {
                $join->on('mtm.id', '=', 'to_rm.mtm_id')
                    ->where('to_rm.rm_id', $toRmId)
                    ->where('to_rm.tr_type', 1);
            })
            ->where('mtm.employee_id', $fromEmployee)
            ->whereYear('mtm.created_at', $year)
            ->whereMonth('mtm.created_at', $month)
            ->selectRaw('
            SUM(from_rm.rm_value) as total_from_rm,
            SUM(to_rm.rm_value) as total_to_rm
        ')
            ->first();

        $totalFrom = $result ? $result->total_from_rm : 0;
        $totalTo   = $result ? $result->total_to_rm : 0;
        $conversionComment = $result? "Converted ".$result->total_from_rm." to ".$result->total_to_rm : "No Converion record";

        $data = [
            'fromRmTotal' => round($totalFrom, 3),
            'toRmTotal'   => round($totalTo, 3),
            'conversionComment' => $conversionComment=="Converted  to "?"Nothing converted": $conversionComment
        ];

        return $this->successResponse($data, "Conversion total fetched");
    }
    public function getMaterialMonthlySend($year, $month, $fromEmployee, $toEmployee,$rmId)
    {
        $total = DB::table('mat_between_employee_details as sender')
            ->join('mat_between_employee_masters as master', 'sender.mat_between_employee_id', '=', 'master.id')
            ->join('mat_between_employee_details as receiver', function ($join) use ($toEmployee, $rmId) {
                $join->on('sender.mat_between_employee_id', '=', 'receiver.mat_between_employee_id')
                    ->where('receiver.employee_id', $toEmployee)
                    ->where('receiver.rm_id', $rmId)
                    ->where('receiver.inward', '>', 0);
            })
            ->where('sender.employee_id', $fromEmployee)
            ->where('sender.rm_id', $rmId)
            ->where('sender.outward', '>', 0)
            ->whereYear('master.created_at', $year)
            ->whereMonth('master.created_at', $month)
            ->sum('sender.outward');
        $result=array();
        $result['value']=round($total, 3);

        return $this->successResponse($result,"total fetched");
    }

    public function monthlyTransactionClosingBalance(Request $request)
    {
        // Normalize camelCase to snake_case
        $rm_id = $request->input('rm_id', $request->input('rmId'));
        $year = $request->input('record_year', $request->input('recordYear'));
        $month = $request->input('record_month', $request->input('recordMonth'));


        // create date
        $date = Carbon::createFromDate($year, $month, 1)->subMonth();

        $prevYear = $date->year;
        $prevMonth = $date->month;

        $data = MonthlyTransaction::where('transaction_particular_id', 1)
            ->where('rm_id', $rm_id)
            ->where('record_year', $prevYear)
            ->where('record_month', $prevMonth)
            ->first();
        if(!$data){
            return $this->errorResponse("No record found",200);
        }
        return $this->successResponse(new MonthlyTransactionResource($data),'Closing Balance fetched successfully');
    }


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
