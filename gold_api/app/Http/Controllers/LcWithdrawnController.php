<?php

namespace App\Http\Controllers;

use App\Models\LcWithdrawn;
use App\Http\Requests\StoreLcWithdrawnRequest;
use App\Http\Requests\UpdateLcWithdrawnRequest;

class LcWithdrawnController extends Controller
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
     * @param  \App\Http\Requests\StoreLcWithdrawnRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreLcWithdrawnRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LcWithdrawn  $lcWithdrawn
     * @return \Illuminate\Http\Response
     */
    public function show(LcWithdrawn $lcWithdrawn)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LcWithdrawn  $lcWithdrawn
     * @return \Illuminate\Http\Response
     */
    public function edit(LcWithdrawn $lcWithdrawn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateLcWithdrawnRequest  $request
     * @param  \App\Models\LcWithdrawn  $lcWithdrawn
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLcWithdrawnRequest $request, LcWithdrawn $lcWithdrawn)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LcWithdrawn  $lcWithdrawn
     * @return \Illuminate\Http\Response
     */
    public function destroy(LcWithdrawn $lcWithdrawn)
    {
        //
    }
}
