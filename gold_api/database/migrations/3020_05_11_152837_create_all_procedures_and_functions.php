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
            CREATE FUNCTION get_customer_gold_due(customer_id varchar(255)) RETURNS double
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

        // কটা জব বিল করা যাবে তার গুনতি
        DB::unprepared('DROP FUNCTION IF EXISTS get_billable_job_count_by_order_id;
            CREATE FUNCTION get_billable_job_count_by_order_id(input_order_id varchar(255)) RETURNS int(11)
                DETERMINISTIC
            BEGIN
                DECLARE total_billable_jobs int;
              set total_billable_jobs=0;
              select count(*) into total_billable_jobs from job_master where status=8 and order_id=input_order_id;
              IF isnull(total_billable_jobs) then
                set total_billable_jobs=0;
              END IF;
                RETURN total_billable_jobs;
            END;'
        );
        // এখনও কতগুলি জবের কাজ চলছে তা জানার জন্য, as per order_id
        DB::unprepared('DROP FUNCTION IF EXISTS get_working_job_count_by_order_id;
            CREATE FUNCTION get_working_job_count_by_order_id(input_order_id varchar(255)) RETURNS int(11)
                DETERMINISTIC
            BEGIN
                DECLARE total_working_jobs int;
              set total_working_jobs=0;
              select count(*) into total_working_jobs from job_master where status not in(2,4,8,9) and order_id=input_order_id;
              IF isnull(total_working_jobs) then
                set total_working_jobs=0;
              END IF;
                RETURN total_working_jobs;
            END;'
        );

        // কটি অর্ডার আছে প্রত্যেক অর্ডার আইডির জন্য
        DB::unprepared('DROP FUNCTION IF EXISTS get_order_count_by_order_id;
            CREATE FUNCTION ses_gold.`get_order_count_by_order_id`(input_order_id varchar(255)) RETURNS int(11)
                DETERMINISTIC
            BEGIN
                DECLARE total_order_count int;
              set total_order_count=0;
              select count(*) into total_order_count from order_details where order_id=input_order_id;
              IF isnull(total_order_count) then
                set total_order_count=0;
              END IF;
                RETURN total_order_count;
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
