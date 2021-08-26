<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
}
