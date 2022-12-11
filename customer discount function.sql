DROP FUNCTION IF EXISTS ses_gold.get_total_lc_discount_by_date_id;
CREATE FUNCTION ses_gold.`get_total_lc_discount_by_date_id`(in_customer_id varchar(255),in_start_date date,in_end_date date, in_discount double) RETURNS int(11)
    DETERMINISTIC
BEGIN
                DECLARE total_lc_discount double;

                select sum(discount) into total_lc_discount from(select bill_master.tr_time,bill_master.bill_no
                ,get_bill_qty_by_bill_no(bill_no) as qty
                , get_bill_lc_by_bill_no(bill_no) as lc
                , get_bill_fine_gold_by_bill_no(bill_no) as fine
                ,is_date_between(tr_time,in_start_date,in_end_date) as is_dicountable
                ,if(is_date_between(tr_time,in_start_date,in_end_date),round(in_discount*get_bill_lc_by_bill_no(bill_no)/100,0),0) as discount
                
                from bill_master
                where bill_master.cust_id=in_customer_id) as table1;
                IF isnull(total_lc_discount) then
                  set total_lc_discount=0;
                END IF;
                return total_lc_discount;
         END;
