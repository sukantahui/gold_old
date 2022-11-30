<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        User::create(['user_name'=>'Sukanta Hui','mobile1'=>'7003756860','mobile2'=>'9830371685'
            ,'email'=>'developer','password'=>"81dc9bdb52d04dc20036dbd8313ed055",'user_type_id'=>7]);
    }
}
