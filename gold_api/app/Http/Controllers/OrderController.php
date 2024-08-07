<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Maxtable;
use App\Models\OrderDetail;
use App\Models\OrderMaster;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends ApiController
{
    public function jobableOrders(){
        $queries = DB::select("select order_id
       ,tr_time
       ,get_order_count_by_order_id(order_id) as order_count
       ,get_customer_by_order_id(order_id) as customer_name
       ,get_agent_by_order_id(order_id) as agent_name
       ,get_order_job_finished_count_by_order_id(order_id) as finished_jobs
       ,get_order_job_cancelled_count_by_order_id(order_id) as cancelled_jobs
       ,get_order_count_by_order_id(order_id)-get_order_job_cancelled_count_by_order_id(order_id)-get_order_job_finished_count_by_order_id(order_id) as remaining
       ,get_fresh_order_count_by_order_id(order_id) as fresh_order_count
       from order_master
       where get_fresh_order_count_by_order_id(order_id)>0");
        return $this->successResponse($queries);
    }
    public function saveOrder(Request $request){
        $input=($request->json()->all());
        $orderMasterInput=(object)($input['orderMaster']);
        $orderDetailsInput=($input['orderDetails']);
        DB::beginTransaction();
        try{

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
            $orderMaster = new OrderMaster();
            $orderMaster->order_id = 'ORD/'.$maxTable->mainfield.'/'.$maxTable->financial_year;
            $orderMaster->order_serial = $maxTable->mainfield;
            $orderMaster->cust_id = $orderMasterInput->cust_id;
            $orderMaster->agent_id = $orderMasterInput->agent_id;
            $orderMaster->order_date = $orderMasterInput->order_date;
            $orderMaster->delivery_date = $orderMasterInput->delivery_date;
            $orderMaster->lc_discount_percentage = $orderMasterInput->lc_discount_percentage;
            $orderMaster->save();

            $return_array['order_master']=$orderMaster;

            if($orderMaster){
                $sl = 1;
                $orderDetailArray = [];
                foreach ($orderDetailsInput as $detail){
                    $orderDetail = new OrderDetail();
                    $orderDetail->sl_no = $sl++;
                    $orderDetail->order_id = $orderMaster->order_id;
                    $orderDetail->product_code = $detail['product_code'];
                    $orderDetail->price_code = $detail['price_code'];
                    $orderDetail->price_method = 'Regular';
                    $orderDetail->price = $detail['lc'];
                    $orderDetail->p_loss = $detail['ploss'];
                    $orderDetail->prd_size = $detail['product_size'];
                    $orderDetail->gold_wt = $detail['expected_gold'];
                    $orderDetail->rm_id = $detail['rm_id'];
                    $orderDetail->particulars = '';
                    $orderDetail->qty = $detail['qty'];
                    $orderDetail->product_mv = $detail['total_mv'];
                    $orderDetail->status = 0;
                    $orderDetail->save();
                    $orderDetailArray[]=$orderDetail;

                }
                $return_array['order_details']=$orderDetailArray;
            }

            DB::commit();
//            return  $this->successResponse($return_array);
            return $this->successResponse($return_array);

        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
    }

    public function getOrderMasterList($pageSize){
        $orderMaster = OrderMaster::select()
                        ->join('customer_master','customer_master.cust_id','=','order_master.cust_id')
                        ->orderBy('tr_time','desc')
                        ->take($pageSize)
                        ->get();
        return $this->successResponse($orderMaster);
    }

    //http://127.0.0.1/gold_old/gold_api/public/api/dev/orderDetails/orderMasterId/1366
    public function getOrderDetailsByOrderMaster($order_master_id){
        $return_array=array();
        $order_master = OrderMaster::findOrFail($order_master_id);

        $order_details = OrderDetail::select()
                            ->whereOrderId($order_master->order_id)

                            ->get();

        $return_array['order_details']=$order_details;
        $customer = Customer::findOrFail($order_master->cust_id);
        $return_array['customer']=$customer;
        $return_array['order_master']=$order_master;


        return $this->successResponse($return_array);
        // return $this->successResponse($customer);
    }


}
