<?php

namespace Database\Seeders;

use App\Models\ExtraItem;
use App\Models\Ledger;
use App\Models\Product;
use App\Models\Unit;
use App\Models\VoucherType;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserType;
use App\Models\ProductCategory;
use App\Models\TransactionType;
use App\Models\LedgerGroup;
use App\Models\CustomerCategory;
use App\Models\State;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        //person_types table data
        UserType::create(['user_type_name' => 'Owner']); //1
        UserType::create(['user_type_name' => 'Manager']); //2
        UserType::create(['user_type_name' => 'Manager Sales']); //3
        UserType::create(['user_type_name' => 'Manager Accounts']); //4
        UserType::create(['user_type_name' => 'Office Staff']); //5
        UserType::create(['user_type_name' => 'Worker']); //6
        UserType::create(['user_type_name' => 'Developer']); //7
        UserType::create(['user_type_name' => 'Customer']); //8
        $this->command->info('User Type creation Finished');

        User::create(['user_name'=>'Vivekananda Ghosh','mobile1'=>'9836444999','mobile2'=>'100','email'=>'vivek','password'=>"81dc9bdb52d04dc20036dbd8313ed055",'user_type_id'=>1]);
        User::create(['user_name'=>'Arindam Ghosh','mobile1'=>'9836444999','mobile2'=>'100','email'=>'arindam','password'=>"81dc9bdb52d04dc20036dbd8313ed055",'user_type_id'=>3]);
        User::create(['user_name'=>'Vivekananda User','mobile1'=>'9836444999','mobile2'=>'100','email'=>'bile','password'=>"81dc9bdb52d04dc20036dbd8313ed055",'user_type_id'=>5]);




    }
}
