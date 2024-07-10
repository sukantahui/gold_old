<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vivek Link</title>
    <link href="node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" >
  </head>
  <body>
    <?php
        $ip_address='http://192.168.0.236/';
        $records=array(
          array('rank'=>1,'topic'=>'Business Status','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/report_controller/daily_report_facade')
          ,array('rank'=>2,'topic'=>'Material Withdrawn','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/material_controller/material_transfer_facade')
          ,array('rank'=>3,'topic'=>'Material to Staff','software'=>'ses_diamond2' ,'link'=>'ses_diamond2/index.php/material_controller/owner_to_employee_facade')
          
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