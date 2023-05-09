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



        DB::unprepared('DROP PROCEDURE IF EXISTS get_modelwise_sale_by_date;
            CREATE PROCEDURE get_modelwise_sale_by_date(in in_start_date date, in in_end_date date, in in_limit int)
            BEGIN
              select bill_details.model_no,sum(bill_details.qty) as sale_qty from bill_master
              inner join bill_details on bill_master.bill_no=bill_details.bill_no
              where date(bill_master.tr_time)>=in_start_date and date(bill_master.tr_time)<=in_end_date
              group by bill_details.model_no
              order by sale_qty desc limit in_limit;
            END;'
        );

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
        // to get billable order list
        DB::unprepared('DROP FUNCTION IF EXISTS get_customer_by_order_id;
             CREATE FUNCTION get_customer_by_order_id(input_order_id varchar(255)) RETURNS varchar(255)
                DETERMINISTIC
            BEGIN
                DECLARE temp_cust_name varchar(255);
                set temp_cust_name="";
                select cust_name into temp_cust_name from order_master inner join customer_master on order_master.cust_id = customer_master.cust_id where order_id=input_order_id;
                IF isnull(temp_cust_name) then
                    set temp_cust_name="not found";
                END IF;
                    RETURN temp_cust_name;
                END;'
        );
        // sale of product to customers by date
        DB::unprepared('DROP PROCEDURE IF EXISTS get_model_sale_to_customer_by_date;
            CREATE PROCEDURE get_model_sale_to_customer_by_date(in in_start_date date, in in_end_date date, in in_model varchar(10))
            BEGIN
                select
                DATE_FORMAT(bill_master.tr_time,"%d/%m/%Y") as bill_date
              ,customer_master.cust_id
              ,customer_master.cust_name
              ,agent_master.short_name as agent,bill_master.bill_no,sum(bill_details.qty) as sale_qty
              from bill_master
              inner join bill_details on bill_details.bill_no = bill_master.bill_no
              inner join customer_master ON customer_master.cust_id = bill_master.cust_id
              inner join agent_to_customer on agent_to_customer.cust_id = customer_master.cust_id
              inner join agent_master ON agent_master.agent_id = agent_to_customer.agent_id
              where bill_details.model_no=in_model and date(bill_master.tr_time)>=in_start_date and  date(bill_master.tr_time)<=in_end_date
              group by customer_master.cust_id, customer_master.cust_name,agent_master.short_name, bill_master.bill_no;
            END;'
        );
        DB::unprepared("DROP PROCEDURE IF EXISTS ses_gold.huitech_generate_pivot_table;
        CREATE PROCEDURE ses_gold.`huitech_generate_pivot_table`(IN sql_statement longtext)
        proc_label: BEGIN
         drop table if exists main_table;
         -- to create temporary table
         set @r=concat(\"CREATE temporary table main_table as \",sql_statement);
         PREPARE stmt1 FROM @r;
         EXECUTE stmt1;
         DEALLOCATE PREPARE stmt1;

          -- to create xyz_temp_view
         set @x=concat(\"CREATE or REPLACE view xyz_temp_view as \",sql_statement);
         PREPARE stmt1 FROM @x;
         EXECUTE stmt1;
         DEALLOCATE PREPARE stmt1;

         set @x=concat(\"SELECT COLUMN_NAME into @field1 FROM information_schema.columns WHERE  table_name = 'xyz_temp_view' limit 0,1\");
         PREPARE stmt1 FROM @x;
         EXECUTE stmt1;
         DEALLOCATE PREPARE stmt1;

         set @x=concat(\"SELECT COLUMN_NAME into @field2 FROM information_schema.columns WHERE  table_name = 'xyz_temp_view' limit 1,1\");
         PREPARE stmt1 FROM @x;
         EXECUTE stmt1;
         DEALLOCATE PREPARE stmt1;

         set @x=concat(\"SELECT COLUMN_NAME into @field3 FROM information_schema.columns WHERE  table_name = 'xyz_temp_view' limit 2,1\");
         PREPARE stmt1 FROM @x;
         EXECUTE stmt1;
         DEALLOCATE PREPARE stmt1;



            BEGIN
                DECLARE v_finished INTEGER DEFAULT 0;
                DECLARE employee_name varchar(255) DEFAULT \"\";
                DECLARE field1 varchar(255) DEFAULT \"\";

                DECLARE pivot_data varchar(255) DEFAULT \"\";

                DECLARE material_value Double;
                DECLARE case_script_1 longtext DEFAULT \"\";
                DECLARE case_script_0 longtext DEFAULT \"\";

                DECLARE temp_script_1 longtext DEFAULT \"\";
                -- declare cursor for pivot_data

                DECLARE curs CURSOR FOR
                  select * from test_prepare_view;


                -- declare NOT FOUND handler
                DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
                drop table if exists test_prepare_view;
                SET @query = CONCAT('CREATE temporary table test_prepare_view as select distinct ', @field2, ' from main_table');
                -- LEAVE proc_label;
                PREPARE stmt from @query;
                EXECUTE stmt;
                DEALLOCATE PREPARE stmt;

                set @s1=\"\";

                OPEN curs;
                -- loop start
                set @s2=\"\";
                get_material: LOOP
                FETCH curs INTO pivot_data;
                IF v_finished = 1 THEN
                  LEAVE get_material;
                END IF;
                set @s1=concat(@s1,',max(`',pivot_data,\"`) as '\",pivot_data,\"'\");
                set @s2=CONCAT(@s2,',round((CASE WHEN ',@field2,' =\'',pivot_data,'\' THEN ',@field3,' else 0 END),3) as \'',pivot_data,'\' ');


                END LOOP get_material;
                -- loop end

                CLOSE curs;
                DROP table if exists test_prepare_view;
                 -- first table is created
                set @s2=concat('select ',@field1,' ',@s2,' from main_table');
                set @s1=concat('select ',@field1,' ',@s1,'from (',@s2,') as table2 group by ',@field1);
                PREPARE stmt FROM @s1;
                EXECUTE stmt;
                DEALLOCATE PREPARE stmt;
            END;

        END;"
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
