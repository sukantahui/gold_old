<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Asset;

class AssetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Asset::create(['assets_name'=>'Cash','opening_balance'=>0]);
        Asset::create(['assets_name'=>'Bank','opening_balance'=>0]);
    }
}
