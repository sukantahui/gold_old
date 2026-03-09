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

        return $this->successResponse($total,"total fetched");
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
