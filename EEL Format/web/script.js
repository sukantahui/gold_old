

$(function () {
  $("body").on("click", "#generate-random", () => {
    alert("sadfsf");
    eel.random_python()((number)=>{
      $('.random_number').text(number);
    });
  });
});