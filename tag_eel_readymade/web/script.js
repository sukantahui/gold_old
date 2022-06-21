
  
  $(function() {

    eel.fetch_tag()(function(output){
      $('#tag').val(output);
    })
    
    $("body").on("click", "#generate-random", ()=> {
      eel.random_python()((number)=>{
        $('.random_number').text(number);
      });
    });

    $("body").on("click", "#update-ip", ()=> {
      var ip=$('#ip-address').val();
      eel.update_ip(ip)((number)=>{
        
      });
    });

    // $('#generate-random').click(function(){
    //     eel.random_python()(function(number){
    //       $('.random_number').text(number);
    //     });
    // });

    $("#add-numbers").click(function() {
      var data_1 = $("#int1").val();  
      var data_2 = $("#int2").val();  
      eel.add(data_1, data_2)(function(output){
          $('#res').val(output);
      })
    });

    $("body").on("click", "#fetch-request", ()=> {
      var jobId=$('#input-job-id').val();
      eel.fetchTagDetails(jobId)(function(requestData){
        var jsonobj = requestData;
        console.log(jsonobj);
        $("#job-id").val(jsonobj.job_id);
        $("#order-id").val(jsonobj.order_id);
        $("#product-code").val(jsonobj.product_code);
        $("#product-size").val(jsonobj.product_size);

        $("#price-code").val(jsonobj.price_code);
        $("#price").val(jsonobj.price);
        $("#pieces").val(jsonobj.pieces);
        $("#status").val(jsonobj.status_name);
        $("#cust-name").val(jsonobj.cust_name);
        $("#cust-short-name").val(jsonobj.short_name);
        $("#total-lc").val(jsonobj.total_lc);
        $("#gold-used").val(jsonobj.gold_used);
        $("#product-wt").val(jsonobj.product_wt);
          // $('#request-output').text(jsonobj.order_id);
      })
    });

    $("body").on("click", "#print-tag", ()=> {
      // var data = $("#tag-form").json();  
      var data =  $("#tag-form").serialize();
      console.log(data);
      eel.printTag(data)(function(){

        });
    });
    
    // $("#fetch-request").click(function() { 
    //   eel.fetchTagDetails('JOB-00001-2122')(function(requestData){
    //     var jsonobj = requestData;
    //     console.log(jsonobj);
    //     $("#job-id").val(jsonobj.job_id);
    //     $("#order-id").val(jsonobj.order_id);
    //     $("#product-code").val(jsonobj.product_code);
    //     $("#product-size").val(jsonobj.product_size);
    //       // $('#request-output').text(jsonobj.order_id);
    //   })
    // });

    $("#test-bat").click(function() { 
      eel.runBatch()(function(){
       console.log('running batch');
      })
    });
});