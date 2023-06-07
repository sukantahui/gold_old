<?php

namespace App\Http\Controllers;

use App\Models\MaterialTransformationDetail;
use App\Http\Requests\StoreMaterialTransformationDetailRequest;
use App\Http\Requests\UpdateMaterialTransformationDetailRequest;

class MaterialTransformationDetailController extends Controller
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
     * @param  \App\Http\Requests\StoreMaterialTransformationDetailRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMaterialTransformationDetailRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MaterialTransformationDetail  $materialTransformationDetail
     * @return \Illuminate\Http\Response
     */
    public function show(MaterialTransformationDetail $materialTransformationDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MaterialTransformationDetail  $materialTransformationDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(MaterialTransformationDetail $materialTransformationDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMaterialTransformationDetailRequest  $request
     * @param  \App\Models\MaterialTransformationDetail  $materialTransformationDetail
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMaterialTransformationDetailRequest $request, MaterialTransformationDetail $materialTransformationDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MaterialTransformationDetail  $materialTransformationDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(MaterialTransformationDetail $materialTransformationDetail)
    {
        //
    }
}
