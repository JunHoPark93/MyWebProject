var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
var roadNum = $('#roadNum').text();

console.log(roadNum);

map.relayout();

var geocoder = new daum.maps.services.Geocoder();

geocoder.addr2coord(roadNum, function(status, result) {

    // 정상적으로 검색이 완료됐으면
     if (status === daum.maps.services.Status.OK) {

        var coords = new daum.maps.LatLng(result.addr[0].lat, result.addr[0].lng);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new daum.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new daum.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    }
});

// //마커를 미리 생성
// var marker = new daum.maps.Marker({
// 	 position: new daum.maps.LatLng(37.537187, 127.005476),
// 	 map: map
// });


// //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
// $('#find_address,#host_postcode,#sample4_address').click(function() {
//     new daum.Postcode({
//         oncomplete: function(data) {
//             // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
//
//             // 각 주소의 노출 규칙에 따라 주소를 조합한다.
//             // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
//             var fullAddr = ''; // 최종 주소 변수
//             var extraAddr = ''; // 조합형 주소 변수
//
//             // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
//             if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
//                 fullAddr = data.roadAddress;
//
//             } else { // 사용자가 지번 주소를 선택했을 경우(J)
//                 fullAddr = data.jibunAddress;
//             }
//
//             // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
//             if (data.userSelectedType === 'R') {
//                 //법정동명이 있을 경우 추가한다.
//                 if (data.bname !== '') {
//                     extraAddr += data.bname;
//                 }
//                 // 건물명이 있을 경우 추가한다.
//                 if (data.buildingName !== '') {
//                     extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
//                 }
//                 // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
//                 fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
//             }
//
//             // 우편번호와 주소 정보를 해당 필드에 넣는다.
//             // alert(data.zonecode);
//             $('#host_postcode').val(data.zonecode);
//             // document.getElementById('sample4_postcode').value = data.zonecode; //5자리 새우편번호 사용
//             document.getElementById('sample4_address').value = fullAddr;
//             geocoder.addr2coord(data.address, function(status, result) {
//                 // 정상적으로 검색이 완료됐으면
//                 if (status === daum.maps.services.Status.OK) {
//                     // 해당 주소에 대한 좌표를 받아서
//                     var coords = new daum.maps.LatLng(result.addr[0].lat, result.addr[0].lng);
//                     console.log(result.addr[0].lat+"&&" +"&&"+ result.addr[0].lng);
//                     // 위도랑 경도를 추가하자ㅏㅏㅏㅏㅏㅏㅏ
//                     $('#hidden_latitude').val(result.addr[0].lat);
//                     $('#hidden_longitude').val(result.addr[0].lng);
//
//                     // 지도를 보여준다.
//                     mapContainer.style.display = "block";
//                     map.relayout();
//                     // 지도 중심을 변경한다.
//                     map.setCenter(coords);
//                     // 마커를 결과값으로 받은 위치로 옮긴다.
//                     marker.setPosition(coords)
//                 }
//             // 커서를 상세주소 필드로 이동한다.
//         });
//         document.getElementById('sample4_address2').focus();
//       }
//
//     }).open();
// });
