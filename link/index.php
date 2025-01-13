<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vivek Link</title>
    <link href="node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" >
    <style>
      .table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2){
        background-color: rgba(100,100,100,.2);
        border: 1px solid black;
      }
      .table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2){
        background-color: rgba(120,130,100,.2);
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <?php
        $ip_address='http://192.168.0.236/';
        $records=array(
          array('rank'=>2,'topic'=>'ses diamond এ আগে login করে নিতে হবে','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/')
          ,array('rank'=>4,'topic'=>'gold master এ আগে login করে নিতে হবে','software'=>'ses_diamond2' ,'link'=>'gold_old/gold_master/#/')
          ,array('rank'=>10,'topic'=>'Business Status','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/report_controller/daily_report_facade')
          ,array('rank'=>15,'topic'=>'List of Business Status','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/report_controller/admin_report_facade')
          ,array('rank'=>20,'topic'=>'Material তুলে নেওয়া','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/material_controller/material_transfer_facade')
          ,array('rank'=>30,'topic'=>'Material to Staff','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/material_controller/owner_to_employee_facade')
          ,array('rank'=>40,'topic'=>'Cahs Balance Report<br>Material Balance<br>Daily LC Receipt<br>Daily Gold Receipt<br>Material Withdrawn','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/report_controller/staff_report_facade')
          ,array('rank'=>50,'topic'=>'Current Working jobs','software'=>'Gold Manager' ,'link'=>'gold_manager2/#!/workingJob')
          ,array('rank'=>60,'topic'=>'Jobs with status and MV','software'=>'Gold Masterr' ,'link'=>'gold_old/Gold_master/#/ProductReport/JobReport')
          ,array('rank'=>70,'topic'=>'job in details by dates','software'=>'ses diamond2' ,'link'=>'ses_diamond2/index.php/report_controller/admin_report_facade')
          ,array('rank'=>80,'topic'=>'JOB and Stock এ কোন Difference থাকলে এইখানে পাওয়া যাবে','software'=>'Gold Manager' ,'link'=>'gold_manager2/#!/jobtoStockDiff')
          ,array('rank'=>90,'topic'=>'Material to Staff','software'=>'Gold Manager' ,'link'=>'gold_manager2/#!/materialTransactionReport')
          ,array('rank'=>100,'topic'=>'Modelwise Sale Report','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/ProductReport/ProductSale')
          ,array('rank'=>110,'topic'=>'Agent & Customer Due Report','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/ProductReport/DueReport')
          ,array('rank'=>120,'topic'=>'New Job Report','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/ProductReport/JobReport')
          ,array('rank'=>130,'topic'=>'Fine Gold Withdrawn by Owner','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/ProductReport/FineReturnedToOwnerReport')
          ,array('rank'=>140,'topic'=>'Cash Withdrawn by Owner Report','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/ProductReport/CashRefundToOwnwer')
          ,array('rank'=>150,'topic'=>'Cash Withdrawn by Owner Activity','software'=>'ses diamond' ,'link'=>'ses_diamond2/index.php/cash_refund_controller/cash_refund_facade')
          ,array('rank'=>160,'topic'=>'Agent Salary','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/AgentSalary')
          ,array('rank'=>170,'topic'=>'এজেন্টদের স্টকের মাল দেওয়ার জন্য','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/TransferToAgent')
          ,array('rank'=>180,'topic'=>'এজেন্টদের থেকে স্টকের মাল তুলে নেওয়ার জন্য','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/TransferFromAgents')
          ,array('rank'=>190,'topic'=>'এজেন্টদের কাছে থাকা স্টকের তথ্য দেখতে হলে','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/AgentWiseStock')
          ,array('rank'=>200,'topic'=>'Customer Due দেখার জায়গা','software'=>'Gold Manager2' ,'link'=>'gold_manager2/#!/agentReport')
          ,array('rank'=>210,'topic'=>'Agent অনুসারে বিক্রির তালিকা','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/AgentWiseSaleReport')
          ,array('rank'=>220,'topic'=>'Agent পরিবর্তন করতে হলে','software'=>'Ses Gold' ,'link'=>'ses_diamond2/index.php/customer_controller/customer_master_facade')
          ,array('rank'=>230,'topic'=>'Customer পরিবর্তন করতে হলে','software'=>'Ses Gold' ,'link'=>'ses_diamond2/index.php/customer_controller/customer_master_facade#nogo')
          ,array('rank'=>240,'topic'=>'Stock দেখার জন্য','software'=>'Gold Master' ,'link'=>'gold_old/Gold_master/#/StockInHandReport')
          
        );
        usort($records, function ($a, $b) { return strnatcmp($a['rank'], $b['rank']); });
        
    ?>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Topic</th>
            <th scope="col">Software</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
        <?php 
              foreach($records as $key=>$record){
                ?>
                    <tr>
                      <th scope="row"><?php echo $key+1;?></th>
                      <td>
                        <a href="<?php echo $ip_address.$record['link'] ?>" target="_blank">
                          <?php echo $record['topic']?>
                        </a>
                      </td>
                      <td><?php echo $record['software']?></td>
                      <td>
                        <a href="<?php echo $ip_address.$record['link'] ?>" target="_blank">Click Here</a>
                      </td>
                    </tr>
                <?php
              }
          ?>
          
        </tbody>
      </table>
    
    <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>