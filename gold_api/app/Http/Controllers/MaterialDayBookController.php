<?php

namespace App\Http\Controllers;

use App\Models\MaterialDayBook;
use App\Http\Requests\StoreMaterialDayBookRequest;
use App\Http\Requests\UpdateMaterialDayBookRequest;

class MaterialDayBookController extends Controller
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
     * @param  \App\Http\Requests\StoreMaterialDayBookRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMaterialDayBookRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MaterialDayBook  $materialDayBook
     * @return \Illuminate\Http\Response
     */
    public function show(MaterialDayBook $materialDayBook)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MaterialDayBook  $materialDayBook
     * @return \Illuminate\Http\Response
     */
    public function edit(MaterialDayBook $materialDayBook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMaterialDayBookRequest  $request
     * @param  \App\Models\MaterialDayBook  $materialDayBook
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMaterialDayBookRequest $request, MaterialDayBook $materialDayBook)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MaterialDayBook  $materialDayBook
     * @return \Illuminate\Http\Response
     */
    public function destroy(MaterialDayBook $materialDayBook)
    {
        //
    }
}
