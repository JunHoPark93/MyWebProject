jQuery(document).ready(function($){
  $('.confirmBtn').hide();
  $('.backBtn').hide();
  $('.reserveBtn').click(function() {
    $(this).css('background', 'pink');
    var name = $('hidden-xs').text();
    alert("hotelreserve");

    // Reserve에서 id를 가져와야 함

    console.log($('#hotelId').text());

    var hotelId = $('#hotelId').text(); // 호텔 고유값
    var dateRange = $("#daterange").val(); // 날짜 범위
    var dateRangeGet;
    var isReserved = false;

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
        console.log("success");

        if(result.hotels.status==="none") {
          console.log(result.hotels.status);
          // 예약 가능
          $('.reserveBtn').hide(); // 버튼 숨겨버려
          $('.confirmBtn').show();

        } else {
          // 날짜 중복되는지 확인해야 함
          console.log(result.hotels.status);
          console.log(result.hotels.hotels.length);

          for(var i=0; i<result.hotels.hotels.length; i++) {
              //console.log(result.hotels.hotels[i].dateRange);
              var validate = dateRangeValidate(result.hotels.hotels[i].dateRange, dateRange);
              // 날짜가 중복이 되는지 검사
              console.log(validate);

              if(validate) {
                $('.reserveBtn').hide(); // 버튼 숨겨버려
                $('.confirmBtn').show();
              } else {
                isReserved = true;
                $('.reserveBtn').hide(); // 버튼 숨겨버려
                $('.confirmBtn').hide();
                $('.backBtn').show();
              }
          }
        }
        if(isReserved) {
          window.alert("누군가 예약했습니다");
        }
        $('.reserveBtn').css('background','blue');
      }
    });
  });

  $('.backBtn').click(function() {
    location.href = '/'; // back to main
  });
});

var dateRangeValidate = function(data, range) {

  // db에 있는 호텔의 날짜 범위
  var start = data.substring(0,10);
  var end = data.substring(13,23);
  console.log("split");
  console.log(start);
  console.log(end);

  console.log(moment(new Date()));
  var test = moment(new Date());

  // 현재 사용자가 예약한 날짜 범위
  var thisStart = range.substring(0,10);
  var thisEnd = range.substring(13, 23);
  console.log(thisStart);
  console.log(thisEnd);

  var startComp = new Date(start);
  var endComp = new Date(end);

  var thisStartComp = new Date(thisStart);
  var thisEndComp = new Date(thisEnd);

  console.log(startComp);
  console.log(thisStartComp);
  if(startComp<=thisStartComp && thisStartComp <=endComp ||
    startComp<=thisEndComp && thisEndComp<=endComp) {
    console.log("overlaps");
    return false;

  } else {
    console.log("not overlaps");
    return true;
  }

  // var momentThisStart = moment(thisStart, "MM/DD/YYYY");
  // console.log(momentThisStart);
  // var momentThisEnd = moment(thisEnd, "MM/DD/YYYY");


  //var testRange = moment.range(a,b);
  //var testRange = DateRange(momentThisStart, momentThisEnd);
  //
  // var momentStart = moment(start, "MM/DD/YYYY");
  // var momentEnd = moment(end, "MM/DD/YYYY");

  // if(newRange.overlaps(range)) {
  //   return "overlaps";
  // } else {
  //   "ok";
  // }
};
