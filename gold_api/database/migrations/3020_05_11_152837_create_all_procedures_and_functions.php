<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAllProceduresAndFunctions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {




        DB::unprepared('DROP FUNCTION IF EXISTS get_agent_gold_due;
            CREATE FUNCTION ses_gold.`get_agent_gold_due`(input_agent_id varchar(255)) RETURNS double
                DETERMINISTIC
            BEGIN
                DECLARE total_gold_due double;

              select round(sum(get_customer_gold_due(agent_to_customer.cust_id)),3) into total_gold_due from agent_to_customer inner join agent_master ON agent_master.agent_id = agent_to_customer.agent_id where agent_master.agent_id=input_agent_id;
              IF isnull(total_gold_due) then
                set total_gold_due=0;
              END IF;
                RETURN total_gold_due;
            END;'
        );
        //new or updated function------------
        DB::unprepared('DROP FUNCTION IF EXISTS get_agent_lc_due;
                CREATE FUNCTION get_agent_lc_due(input_agent_id varchar(255)) RETURNS double
                    DETERMINISTIC
         BEGIN
                DECLARE total_lc_due double;

                select sum(get_customer_lc_due(agent_to_customer.cust_id)) into total_lc_due from agent_to_customer inner join agent_master ON agent_master.agent_id = agent_to_customer.agent_id where agent_master.agent_id=input_agent_id;
                IF isnull(total_lc_due) then
                   set total_lc_due=0;
                END IF;
                RETURN total_lc_due;
         END;'
        );

        DB::unprepared('DROP FUNCTION IF EXISTS get_customer_gold_due;
            CREATE DEFINER=`root`@`127.0.0.1` FUNCTION get_customer_gold_due(customer_id varchar(255)) RETURNS double
                DETERMINISTIC
            BEGIN
                DECLARE total_gold_due double;
                  set total_gold_due=0;
                  select (get_customer_opening_gold(cust_id)+get_customer_sale_gold_total(cust_id)-get_customer_gold_received_total(cust_id)) into total_gold_due from customer_master where cust_id = customer_id;
                  IF isnull(total_gold_due) then
                    set total_gold_due=0;
                  END IF;
	            RETURN total_gold_due;
            END;'
        );

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('all_procedures_and_functions');
    }
}
