<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AgentToCustomer;
use App\Models\Customer;
use App\Models\Maxtable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends ApiController
{
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customers
    public function index(){
        $result = Customer::get();
        return $this->successResponse($result);
    }
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customers/agent/{agentId}
    public function getCustomerByAgent($agentId){
        $customers = AgentToCustomer::whereAgentId($agentId)->pluck('cust_id')->toArray();

//        $ids =implode("','",$customers);
        $result = Customer::whereIn('cust_id',$customers)->get();

        return $this->successResponse($result);
    }
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customers/agent/{agentId}/inforced
    public function getInforcedCustomerByAgent($agentId){
        $customers = AgentToCustomer::whereAgentId($agentId)->pluck('cust_id')->toArray();

//        $ids =implode("','",$customers);
        $result = Customer::whereOrderInforce(1)->whereIn('cust_id',$customers)->orderBy('cust_name')->get();

        return $this->successResponse($result);
    }
    public function getInforcedCustomers(){
        $result = Customer::whereOrderInforce(1)->orderBy('cust_name')->get();

        return $this->successResponse($result);
    }

    public function saveCustomer(Request $request){

        $return_array = array();
        $accounting_year = get_accounting_year();
        $maxTable = Maxtable::whereTableNameAndFinancialYear('order_master',$accounting_year)->first();
        if($maxTable){
            $maxTable->mainfield =  $maxTable->mainfield + 1;
            $maxTable->save();
            $return_array['maxTable']=$maxTable;
        }else{
            $maxTable = new Maxtable();
            $maxTable->table_name = 'order_master';
            $maxTable->mainfield = 1;
            $maxTable->prefix = 'ORD';
            $maxTable->suffix = 'None';
            $maxTable->financial_year = $accounting_year;
            $maxTable->save();

            $return_array['maxTable']=$maxTable;
        }
        $customer = new Customer();
        $customer->cust_id='CUST/'.$maxTable->mainfield.'/'.$maxTable->financial_year;
        $customer->cust_name=$request->cust_name;
        $customer->mailing_name=$request->mailing_name;
        $customer->city=$request->city;
        $customer->cust_address=$request->cust_address;
        $customer->cust_pin=$request->cust_pin;
        $customer->cust_phone=$request->cust_phone;
        $customer->p_cat=$request->p_cat;
        $customer->gold_limit=$request->gold_limit;
        $customer->markup_value=$request->markup_value;
        $customer->markuped=$request->markuped;
        $customer->user_id=$request->user_id;
        $customer->order_inforce=$request->order_inforce;
        $customer->bill_inforce=$request->bill_inforce;
        $customer->short_name=$request->short_name;
        $customer->lc_discount_percentage=$request->lc_discount_percentage;
        $customer->save();

        return $this->successResponse($customer);

    }
    public function getCustomerDues($custId,$startDate,$endDate,$discount){
        $dues = (object)(DB::select('select cust_id, get_customer_lc_due(cust_id) as lc_due, round(get_customer_gold_due(cust_id),3) as gold_due from customer_master where cust_id=?', [$custId])[0]);
        $result = DB::select('call get_cutomer_discountable_bill_by_id_date(?,?,?,?)', [$custId,$startDate,$endDate,$discount]);
        $lcDiscount = collect($result)->sum('discount');
//        $dues->setAttribute('lc_discount', $lcDiscount);
        $dues->discount = $lcDiscount;
        return $this->successResponse($dues);
    }

}
