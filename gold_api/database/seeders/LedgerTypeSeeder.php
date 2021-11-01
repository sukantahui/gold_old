<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LedgerType;

class LedgerTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        LedgerType::create(['ledger_type_name' => 'Income','value'=>1]);
        LedgerType::create(['ledger_type_name' => 'Expenditure','value'=>-1]);
    }
}
