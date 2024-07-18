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
          array('rank'=>2,'topic'=>'ses diamond login','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/')
          ,array('rank'=>4,'topic'=>'gold master login','software'=>'ses_diamond2' ,'link'=>'gold_old/gold_master/#/')
          ,array('rank'=>10,'topic'=>'Business Status','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/report_controller/daily_report_facade')
          ,array('rank'=>20,'topic'=>'Material Withdrawn','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/material_controller/material_transfer_facade')
          ,array('rank'=>30,'topic'=>'Material to Staff','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/material_controller/owner_to_employee_facade')
          ,array('rank'=>40,'topic'=>'Cahs Balance Report<br>Material Balance<br>Daily LC Receipt<br>Daily Gold Receipt<br>Material Withdrawn','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/report_controller/staff_report_facade')
          ,array('rank'=>50,'topic'=>'Current Working jobs','software'=>'Gold Manager' ,'link'=>'gold_manager2/#!/workingJob')
          ,array('rank'=>60,'topic'=>'Jobs with status and MV','software'=>'Gold Manager' ,'link'=>'gold_manager2/#!/jobReport')
          ,array('rank'=>70,'topic'=>'job in details by dates','software'=>'ses diamond2' ,'link'=>'ses_diamond2/index.php/report_controller/admin_report_facade')
          ,array('rank'=>80,'topic'=>'JOB and Stock Difference','software'=>'Gold Manager' ,'link'=>'gold_manager2/#!/jobtoStockDiff')
          ,array('rank'=>90,'topic'=>'Material to Staff','software'=>'Gold Manager' ,'link'=>'gold_manager2/#!/materialTransactionReport')
          ,array('rank'=>100,'topic'=>'Modelwise Sale Report','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/ProductReport/ProductSale')
          ,array('rank'=>110,'topic'=>'Agent & Customer Due Report','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/ProductReport/DueReport')
          ,array('rank'=>120,'topic'=>'New Job Report','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/ProductReport/JobReport')
          ,array('rank'=>130,'topic'=>'Fine Gold Withdrawn by Owner','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/ProductReport/FineReturnedToOwnerReport')
          ,array('rank'=>140,'topic'=>'Cash Withdrawn by Owner Report','software'=>'Gold Master' ,'link'=>'gold_old/gold_master/#/ProductReport/CashRefundToOwnwer')
          ,array('rank'=>150,'topic'=>'Cash Withdrawn by Owner Activity','software'=>'ses diamond' ,'link'=>'ses_diamond2/index.php/cash_refund_controller/cash_refund_facade')
          
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
                      <td><?php echo $record['topic']?></td>
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