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


jQuery(document).ready(function($){
  $('.reserveBtn').click(function() {
    $(this).css('background', 'pink');
    var name = $('hidden-xs').text();
    alert("check");
    alert(name);
  });
});
