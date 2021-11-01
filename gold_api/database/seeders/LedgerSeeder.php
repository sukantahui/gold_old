<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ledger;

class LedgerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //


        Ledger::create(['ledger_name'=>'Received from Owner','ledger_type_id'=>1]);
        Ledger::create(['ledger_name'=>'Received LC','ledger_type_id'=>1]);
        Ledger::create(['ledger_name'=>'Refinish income','ledger_type_id'=>1]);
        Ledger::create(['ledger_name'=>'Misc. Received','ledger_type_id'=>1]);

        Ledger::create(['ledger_name'=>'Withdraw by Owner','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Electricity Bill Paid','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Municipal Tax','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Saraswati Puja Expenditure','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Biswakarma Puja Expenditure','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Daily Puja Expenditure','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Daily Tiffin Expenditure','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Muchi','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Sweeper','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Van Rent','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Car Rent','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'TA for Salesman','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Gas Equipment purchase','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Donation Paid','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Market Expenditure for owner','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Gas Expenditure','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Salary paid','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Misc. Expenditure','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Cleaning Material Purchase','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Bala Making Charge Paid','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Dice Charge paid','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Color Purchase','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Electric worker paid ','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Electric Equipment Purchase','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Costic Purchase','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Acid Purchase','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Sohaga Purchase','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Bronze Purchase','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Copper Purchase','ledger_type_id'=>2]);
        Ledger::create(['ledger_name'=>'Phone Bill Paid','ledger_type_id'=>2]);
    }
}
