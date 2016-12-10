// $(document).ready(function() {
//   // $('.reserveBtn').click(function() {
//   //   var value = $(this).attr('.hidden-xs');
//   //   alert(value);
//   // });
//   $('.reserveBtn').click(function() {
//     $(this).css('background', 'pink');
//     var name = $('hidden-xs').text();
//     alert("check");
//     alert(name);
//   });
// });


// jQuery(document).ready(function($){
//   $('.reserveBtn').click(function() {
//     $(this).css('background', 'pink');
//     var name = $('hidden-xs').text();
//     alert("check");
//   });
// });

$('#regionSelect').change(function() {
  console.log(($('#regionSelect').val()));
  var region = $('#regionSelect').val();

  $.ajax({
    url: '/hotel/show/',
    method: 'PUT',
    dataType: 'json',
    data: {
      region: region
    },
    success: function(result) {
      console.log("success!");

      console.log("-----------------");
      console.log(result.hotels); // 배열의 형태로 넘어오기 때문에 배열로 뜯어준다

      if(result.hotels.length == 0) {
          $('#hotels').html("");
          $('#hotels').append('<p> Oops!! there is no registered hotel in this region </p>');
      } else { // 정보가 있는것
        console.log(result.hotels[0].region);
        console.log(result.hotels.length);
        $('#hotels').html("");


        for(var i=0; i<result.hotels.length; i++) {
          var hotelId = result.hotels[i]._id;
          var price = result.hotels[i].price;
          var select = result.hotels[i].select;
          var houseName = result.hotels[i].houseName;
          var name = result.hotels[i].name;
          var introduction = result.hotels[i].introduction;

          // hotel.jade의 html을 변경한다
          $('#hotels').append('<div class="col-sm-6 frame"><div class="brdr bgc-fff pad-10 box-shad btm-mrg-20 property-listing"><div class="media"><form id="myForm" action="/hotel/'+hotelId+'" method="post"><a href="#" target="_parent" class="pull-left"><img alt="image" src="http://images.prd.mris.com/image/V2/1/Yu59d899Ocpyr_RnF0-8qNJX1oYibjwp9TiLy-bZvU9vRJ2iC1zSQgFwW-fTCs6tVkKrj99s7FFm5Ygwl88xIA.jpg" class="img-responsive" /></a><div class="clearfix visible-sm"></div><div class="media-body fnt-smaller"><a href="#" target="_parent"></a><h4 class="media-heading price"><a id="price" href="#" target="_parent">'+'$'+price+'</a><small class="pull-right">houseName : '+houseName+'</small></h4><ul class="list-inline mrg-0 btm-mrg-10 clr-535353"><li>'+select+'</li><li style="list-style: none">|</li><li>Owner : '+name+'</li></ul><p class="hidden-xs">'+introduction+'</p><span class="fnt-smaller fnt-lighter fnt-arial">Select hotel you want</span><button id="hotellistBtn" type="submit" class="btn btn-primary reserveBtn">Reserve</button></div></form></div></div></div>');
        }
      }

    }

  });
});

$('.reserveBtn').click(function() {
  $(this).css('background', 'pink');
  var name = $('hidden-xs').text();
  window.alert("check");
});

// window.onload = function() {
//   $('.reserveBtn').click(function() {
//     $(this).css('background', 'pink');
//     var name = $('hidden-xs').text();
//     alert("check");
//   });
// };
