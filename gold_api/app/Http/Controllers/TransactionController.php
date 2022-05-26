<?php

namespace App\Http\Controllers;

use App\Models\CustomVoucher;
use App\Models\Transaction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends ApiController
{

    public function getIncomeTransactions()
    {
        $result = Transaction::join('ledgers','transactions.ledger_id','ledgers.id')
            ->join('assets','transactions.asset_id','assets.id')
            ->select('transactions.id','transactions.transaction_date','transactions.transaction_number',DB::raw("date_format(transaction_date,'%D %M %Y') as formatted_date"),'transactions.ledger_id','ledgers.ledger_name','transactions.asset_id','assets.assets_name','transactions.voucher_number','transactions.voucher_id','transactions.particulars','transactions.user_id','transactions.amount')
            ->where('transactions.voucher_id','=',1)
            ->orderBy('transactions.transaction_date','DESC')
            ->get();
        return $this->successResponse($result);
    }
    public function saveIncomeTransaction(Request $request)
    {

        $input=(object)($request->json()->all());
        DB::beginTransaction();
        try {
            $temp_date = explode("-", $input->transactionDate);
            $accounting_year = "";
            if ($temp_date[1] > 3) {
                $x = $temp_date[0] % 100;
                $accounting_year = $x * 100 + ($x + 1);
            } else {
                $x = $temp_date[0] % 100;
                $accounting_year = ($x - 1) * 100 + $x;
            }

            $customVoucher = CustomVoucher::where('voucher_name', "Income")->Where('accounting_year', $accounting_year)->first();

            if ($customVoucher) {
                $customVoucher->last_counter = $customVoucher->last_counter + 1;
                $customVoucher->save();
            } else {
                $customVoucher = new CustomVoucher();
                $customVoucher->voucher_name = "Income";
                $customVoucher->accounting_year = $accounting_year;
                $customVoucher->last_counter = 1;
                $customVoucher->delimiter = '-';
                $customVoucher->prefix = 'INC';
                $customVoucher->save();
            }
            $transaction_number = $customVoucher->prefix
                . $customVoucher->delimiter
                . str_pad($customVoucher->last_counter, 6, '0', STR_PAD_LEFT)
                . $customVoucher->delimiter
                . $customVoucher->accounting_year;
            $transaction = new Transaction();
            $transaction->transaction_date = $input->transactionDate;
            $transaction->transaction_number = $transaction_number;
            $transaction->ledger_id = $input->ledgerId;
            $transaction->asset_id = $input->assetId;
            $transaction->voucher_number = $input->voucherNumber;
            $transaction->amount = $input->amount;
            $transaction->voucher_id = $input->voucherId;
            $transaction->particulars = $input->particulars;
            $transaction->user_id = $input->userId;
            $transaction->save();
            DB::commit();
            $result = Transaction::join('ledgers', 'transactions.ledger_id', 'ledgers.id')
                ->join('assets', 'transactions.asset_id', 'assets.id')
                ->select('transactions.id', 'transactions.transaction_date','transactions.transaction_number', DB::raw("date_format(transaction_date,'%D %M %Y') as formatted_date"), 'transactions.ledger_id', 'ledgers.ledger_name', 'transactions.asset_id', 'assets.assets_name', 'transactions.voucher_number', 'transactions.voucher_id', 'transactions.particulars', 'transactions.user_id', 'transactions.amount')
                ->where('transactions.voucher_id', '=', 1)->where('transactions.id', '=', $transaction->id)
                ->first();
            return $this->successResponse($result);
        }
        catch (\Exception $e)
        {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
    }


    public function getExpenditureTransactions()
    {
        $result = Transaction::join('ledgers','transactions.ledger_id','ledgers.id')
            ->join('assets','transactions.asset_id','assets.id')
            ->select('transactions.id','transactions.transaction_date','transactions.transaction_number',DB::raw("date_format(transaction_date,'%D %M %Y') as formatted_date"),'transactions.ledger_id','ledgers.ledger_name','transactions.asset_id','assets.assets_name','transactions.voucher_number','transactions.voucher_id','transactions.particulars','transactions.user_id','transactions.amount')
            ->where('transactions.voucher_id','=',2)
            ->orderBy('transactions.transaction_date','DESC')
            ->get();
        return $this->successResponse($result);
    }
    public function saveExpenditureTransaction(Request $request){
        $input=(object)($request->json()->all());
        DB::beginTransaction();
        try
        {
            $temp_date = explode("-",$input->transactionDate);
            $accounting_year="";
            if($temp_date[1]>3){
                $x = $temp_date[0]%100;
                $accounting_year = $x*100 + ($x+1);
            }else{
                $x = $temp_date[0]%100;
                $accounting_year =($x-1)*100+$x;
            }

            $customVoucher=CustomVoucher::where('voucher_name',"Expenditure")->Where('accounting_year',$accounting_year)->first();

            if($customVoucher) {
                $customVoucher->last_counter = $customVoucher->last_counter + 1;
                $customVoucher->save();
            }else{
                $customVoucher= new CustomVoucher();
                $customVoucher->voucher_name="Expenditure";
                $customVoucher->accounting_year=$accounting_year;
                $customVoucher->last_counter=1;
                $customVoucher->delimiter='-';
                $customVoucher->prefix='EXP';
                $customVoucher->save();
            }
            $transaction_number=$customVoucher->prefix
                .$customVoucher->delimiter
                .str_pad($customVoucher->last_counter,6,'0',STR_PAD_LEFT)
                .$customVoucher->delimiter
                .$customVoucher->accounting_year;
            $transaction= new Transaction();
            $transaction->transaction_date = $input->transactionDate;
            $transaction->transaction_number = $transaction_number;
            $transaction->ledger_id = $input->ledgerId;
            $transaction->asset_id = $input->assetId;
            $transaction->voucher_number = $input->voucherNumber;
            $transaction->amount = $input->amount;
            $transaction->voucher_id = $input->voucherId;
            $transaction->particulars = $input->particulars;
            $transaction->user_id = 1;
            $transaction->save();
            DB::commit();

            $result = Transaction::join('ledgers','transactions.ledger_id','ledgers.id')
                ->join('assets','transactions.asset_id','assets.id')
                ->select('transactions.id','transactions.transaction_date','transactions.transaction_number',DB::raw("date_format(transaction_date,'%D %M %Y') as formatted_date"),'transactions.ledger_id','ledgers.ledger_name','transactions.asset_id','assets.assets_name','transactions.voucher_number','transactions.voucher_id','transactions.particulars','transactions.user_id','transactions.amount')
                ->where('transactions.voucher_id','=',2)
                ->where('transactions.id','=',$transaction->id)
                ->first();
            return $this->successResponse($result);
        }
        catch (\Exception $e)
        {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }

    }

    public function get_transaction_years(){
        $result = Transaction::select(DB::raw('distinct year(transaction_date) as transaction_year'))->get();
        foreach ($result as $row){
            $months = Transaction::select(DB::raw('distinct month(transaction_date) as month_number'),DB::raw("date_format(transaction_date,'%M') as month_name"))
                ->where(DB::raw('year(transaction_date)'), '=', $row->transaction_year)
                ->orderBy(DB::raw('month(transaction_date)'))
                ->get();
            $row->setAttribute('months',$months);
        }

        return $this->successResponse($result);
    }
    public function get_income_ledgers_group_total_by_year($year){
        $result = Transaction::join('ledgers','transactions.ledger_id','ledgers.id')
            ->select('transactions.ledger_id', 'ledgers.ledger_name', DB::raw('sum(transactions.amount) as amount'))
            ->groupBy('transactions.ledger_id')
            ->where('transactions.voucher_id','=',1)
            ->where(DB::raw('year(transactions.transaction_date)'),'=',$year)
            ->get();
        return $this->successResponse($result);
    }
    public function get_income_ledgers_group_total_by_year_n_month($year, $month){
        $result = Transaction::join('ledgers','transactions.ledger_id','ledgers.id')
            ->select('transactions.ledger_id', 'ledgers.ledger_name', DB::raw('sum(transactions.amount) as amount'))
            ->groupBy('transactions.ledger_id')
            ->where('transactions.voucher_id','=',1)
            ->where(DB::raw('year(transactions.transaction_date)'),'=',$year)
            ->where(DB::raw('month(transactions.transaction_date)'),'=',$month)
            ->get();
        return $this->successResponse($result);
    }
    public function get_expenditure_ledgers_group_total_by_year($year){
        $result = Transaction::join('ledgers','transactions.ledger_id','ledgers.id')
            ->select('transactions.ledger_id', 'ledgers.ledger_name', DB::raw('sum(transactions.amount) as amount'))
            ->groupBy('transactions.ledger_id')
            ->where('transactions.voucher_id','=',2)
            ->where(DB::raw('year(transactions.transaction_date)'),'=',$year)
            ->get();
        return $this->successResponse($result);
    }

    public function get_expenditure_ledgers_group_total_by_year_n_month($year){
        $result = Transaction::join('ledgers','transactions.ledger_id','ledgers.id')
            ->select('transactions.ledger_id', 'ledgers.ledger_name', DB::raw('sum(transactions.amount) as amount'))
            ->groupBy('transactions.ledger_id')
            ->where('transactions.voucher_id','=',2)
            ->where(DB::raw('year(transactions.transaction_date)'),'=',$year)
            ->where(DB::raw('year(transactions.transaction_date)'),'=',$year)
            ->get();
        return $this->successResponse($result);
    }
}
