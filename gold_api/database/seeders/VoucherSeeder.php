<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Voucher;

class VoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Voucher::create(['voucher_name'=>'Receipt']);
        Voucher::create(['voucher_name'=>'Payment']);
    }
}
