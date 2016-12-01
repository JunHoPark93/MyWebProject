jQuery(document).ready(function($){
  $('.reserveBtn').click(function() {
    $(this).css('background', 'pink');
    var name = $('hidden-xs').text();
    alert("hotelreserve");

    // Reserve에서 id를 가져와야 함

    console.log($('#hotelId').text());

    var hotelId = $('#hotelId').text(); // 호텔 고유값
    var dateRange = $("#daterange").val(); // 날짜 범위

    console.log(dateRange);

    var self = this;
    $.ajax({
      url: '/hotel/check/',
      method: 'PUT',
      dataType: 'json',
      data: {
        hotelId: hotelId,
        dateRange: dateRange
      },
      success: function(result) {
        console.log("11");
        console.log(result);
        if(result.result==="true") {
          //$('.result').css('background', 'black');
          console.log("success");
        }
        $('.reserveBtn').css('background','blue');
      }
    });
  });
});
