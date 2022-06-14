
  
  $(document).ready(function() {

    $("body").on("click", "#generate-random", ()=> {
      eel.random_python()((number)=>{
        $('.random_number').text(number);
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
        $("#status").val(jsonobj.status);
          // $('#request-output').text(jsonobj.order_id);
      })
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