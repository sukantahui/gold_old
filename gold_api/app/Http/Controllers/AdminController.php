<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class AdminController extends ApiController
{
    public function backup_database()
    {
        \Artisan::call('db:dump');
        $result = Artisan::output();
        $replaced = Str::substr($result,6);
        $replaced = Str::replaceLast('\\r\\n', '\r\n', $replaced);
        return $this->successResponse($replaced,"Database backed up");
    }
}
