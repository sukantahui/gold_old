<?php

namespace App\Http\Controllers;

use App\Models\PlossWithdraw;
use App\Http\Requests\StorePlossWithdrawRequest;
use App\Http\Requests\UpdatePlossWithdrawRequest;

class PlossWithdrawController extends Controller
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
     * @param  \App\Http\Requests\StorePlossWithdrawRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePlossWithdrawRequest $request)
    {
        $withdraw = PlossWithdraw::create($request->validated());

        return response()->json([
            'status' => true,
            'message' => 'Ploss Withdraw record created successfully.',
            'data' => $withdraw
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PlossWithdraw  $plossWithdraw
     * @return \Illuminate\Http\Response
     */
    public function show(PlossWithdraw $plossWithdraw)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PlossWithdraw  $plossWithdraw
     * @return \Illuminate\Http\Response
     */
    public function edit(PlossWithdraw $plossWithdraw)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePlossWithdrawRequest  $request
     * @param  \App\Models\PlossWithdraw  $plossWithdraw
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePlossWithdrawRequest $request, PlossWithdraw $plossWithdraw)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PlossWithdraw  $plossWithdraw
     * @return \Illuminate\Http\Response
     */
    public function destroy(PlossWithdraw $plossWithdraw)
    {
        //
    }
}
