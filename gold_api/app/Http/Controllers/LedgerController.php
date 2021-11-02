<?php

namespace App\Http\Controllers;

use App\Models\Ledger;
use App\Http\Controllers\Controller;
use App\Models\LedgerType;
use Illuminate\Http\Request;

class LedgerController extends ApiController
{
    public function create_ledger(Request $request)
    {
        $input=(object)($request->json()->all());
        $ledger= new Ledger();
        $ledger->ledger_type_id=$input->ledger_type_id;
        $ledger->ledger_name=$input->ledger_name;
        $ledger->save();
        return $this->successResponse($ledger);
    }
    public function get_income(){
        $incomes=LedgerType::find(1)->ledgers->where('inforce','=',1);
        return $this->successResponse($incomes);
    }
    public function get_expenditure(){
        $expenditures = Ledger::where('inforce','=',1)->where('ledger_type_id','=',2)->orderBy('ledger_name')->get();
        return $this->successResponse($expenditures);
    }

}
