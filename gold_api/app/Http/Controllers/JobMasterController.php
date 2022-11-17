<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobOwnerResource;
use App\Http\Resources\TagResource;
use Illuminate\Http\Request;
use App\Models\JobMaster;

class JobMasterController extends ApiController
{
    public function getJobIdByJobMaster(Request $request){
        $date1 = date($request->input("date1"));
        $date2 = date($request->input("date2"));

//        $result = JobMaster::select('job_id')
//                  ->where('tr_time','>',$date1)
//                  ->where('tr_time','<',$date2)
//                  ->get();

        $result = JobMaster::select('job_id')->whereBetween('tr_time',[$date1,$date2])->pluck('job_id');
        return $this->successResponse($result);
    }
    public function getJobById($job_id){
        $result = JobMaster::findOrFail($job_id);
        return $this->successResponse($result);
    }
    public function getDetailsForTag($job_id){
        $result = JobMaster::join('order_details','job_master.order_no','=','order_details.order_no')
            ->join('order_master','order_master.order_id','=','order_details.order_id')
            ->join('customer_master','order_master.cust_id','=','customer_master.cust_id')
            ->join('rm_master','rm_master.rm_ID','=','job_master.rm_id')
            ->join('table_status','table_status.status_ID','=','job_master.status')
            ->select('job_master.job_id',
                'order_master.cust_id',
                'customer_master.cust_name',
                'customer_master.short_name',
                'job_master.status',
                'table_status.status_name',
                'job_master.order_id',
                'job_master.product_code',
                'job_master.rm_id',
                'rm_master.rm_name',
                'job_master.product_size',
                'job_master.pieces',
                'job_master.p_loss',
                'job_master.price',
                'job_master.price_code',
                'job_master.dal_send',
                'job_master.dal_returned',
                'job_master.gold_send',
                'job_master.gold_returned',
                'job_master.pan_send',
                'job_master.pan_id',
                'job_master.pan_returned',
                'job_master.nitrick_returned',
                'job_master.product_wt',
                'job_master.markup_value'

            )->whereJobId($job_id)->first();
//        return $this->successResponse($result);
        return $this->successResponse(new TagResource($result));
    }


    public function getOderIdByStatus(){
        $orderId = JobMaster::select('order_id')
                    ->where('status','=','8')
                    ->get();
        return $this->successResponse($orderId);
    }

    public function getJobByDate($dateFrom,$dateTo){
        $result=JobMaster::where('job_master.tr_time','>=',$dateFrom)
                        ->where('job_master.tr_time','<=',$dateTo)->get();
//        return $this->successResponse(JobOwnerResource::collection($result));
        return $this->successResponse($result);
    }
}
