<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>

<div class="main-content" id="main-content">
   <div class="main_body">
      <div class="board_wrap">
        
         <div class="feed">
            <div class="feed_id">
               <div class="id_round">
                        
                        <div class="id_box">
                          <div class="id_box_img">
                              <img class="id_img" id="id_img" src="/resources/images/1등급.png" alt="내 프로필">
                           </div>
                     <div class="id_container">
                              <div class="id_name">${tripUser.username}</div>
                          </div>
                        </div>
                  </div>
            </div>
         </div>
         
         <div class="feed_2">
            <!-- 캐러셀 -->
            <div class="feed_2">
               <div class="carousel-container">
                  <div class="carousel-inner">
                     <div class="feed_picture carousel-item" >
                        <img src="${TourVO.url}" class="gallery-image" alt="피드 사진 1" style="height:1000px; width: 600px;">
                     </div>
                     <div class="feed_picture carousel-item">
                        <div id="map" class="gallery-image" style="height:600px;"></div>   
                     </div>
                  </div>
               </div>
                  <button class="carousel-control" id="carousel-control-prev" onclick="prevSlide()" style="top: 34%;">❮</button>
                    <button class="carousel-control" id="carousel-control-next" onclick="nextSlide()" style="top: 34%;">❯</button>
            </div>
         </div>
            
         <!-- 모달 -->
         <div id="customModal" class="custom-modal">
            <span class="close-btn" onclick="closeMoreOptionsModal()">&times;</span>
            <h5>수정 및 삭제</h5>
            <!-- 모달 내용을 입력할 부분 -->
            <!-- 예: 폼 요소, 텍스트 영역 등 -->
            <button onclick="handleUpdate()">수정</button>
            <button onclick="handleDelete()">삭제</button>
         </div>


         <!--/feedbottom-->
         <form action="/trip/writeBoard" method="POST">
            <div class="feed_2">    
               <div class="feed_update">
                  <div><label for="title">관광지 번호 : </label><input type="text" class="updateInput" id="TL_NO" placeholder="관광지 번호" name="TL_NO" readonly value="${TourVO.TL_NO}"/></div>
                    <div><input type="hidden" class="updateInput" id="id" placeholder="게시판 아이디" name="id" readonly value="${tripUser.id}"/ ></div>
                    <div><input type="hidden" class="updateInput" id="nickname" placeholder="게시판 닉네임" name="nickname" readonly value="${tripUser.nickname}"/></div>
                    <div><label for="cat">카테고리 : </label><input type="text" class="updateInput" id="cat" placeholder="카테고리" name="cat" readonly value="${TourVO.cat}"/></div>
                  
                  <div><label for="title">제목 : </label><input type="text" class="updateInput" id="title" placeholder="제목" name="title" /></div>
                    <div class="verticalU"><label class="labelU" for="content">본문 : </label><textarea cols="7" class="updateInput" id="content" placeholder="본문" name="content"></textarea></div>
                    <div><label for="tag">태그 : </label><input type="text" class="updateInput" id="tag" placeholder="#태그 #태그 #태그" name="tag" /></div>
                   <button type="submit" class="updateInput" style="backgroud: transparent;">완료</button>
               </div>
            </div>
         </form>   
         
      </div>
   </div>
</div>
<input type = "hidden" value="${TourVO.address}" id="address"/>
         
<style>
.updateInput {
   width: 80%;
   margin: 10px 0px;
   padding: 10px;
   border: 1px solid gray;
}
#BD_NO {
/*수정창에 보여지는 박스 테두리 안보이게하는 부분*/
    border: none; /* 테두리 없애기 */
    background: none; /* 배경 없애기 */
    width:50%;
}
#like_cnt {
    border: none; /* 테두리 없애기 */
    background: none; /* 배경 없애기 */
    width:50%;
}
#cat {
    border: none; /* 테두리 없애기 */
    background: none; /* 배경 없애기 */
    width:50%;
}
.feed_update {
   margin: 20px;
}
</style>

<script>
   let currentSlide = 0;

   function showSlide(index) {
      const carouselInner = document.querySelector('.carousel-inner');
      const totalSlides = document.querySelectorAll('.carousel-item').length;

      if (index >= totalSlides) {
         currentSlide = 0;
      } else if (index < 0) {
         currentSlide = totalSlides - 1;
      } else {
         currentSlide = index;
      }

      const translateValue = -currentSlide * 100 + '%';
      carouselInner.style.transform = 'translateX(' + translateValue + ')';
   }
   
   function nextSlide() {
      showSlide(currentSlide + 1);
   }

   function prevSlide() {
      showSlide(currentSlide - 1);
   }

   function openMoreOptionsModal() {
      // 모달을 열기 위해 Bootstrap의 modal 함수 호출
      $('#moreOptionsModal').modal('show');
   }

   function editFunction() {
      // 수정 로직을 여기에 추가
      alert('수정 기능이 호출되었습니다.');
      // 필요한 경우 Ajax 또는 다른 방법으로 실제 수정 동작을 수행할 수 있습니다.
   }

   function deleteFunction() {
       // 삭제 로직을 여기에 추가
       alert('삭제 기능이 호출되었습니다.');
       // 필요한 경우 Ajax 또는 다른 방법으로 실제 삭제 동작을 수행할 수 있습니다.
   }
   $("#img_heart").click(function() {
       var currentSrc = $(this).attr('src');
       var newSrc = currentSrc == '/resources/SampleImg/heart.png' ? '/resources/SampleImg/heart_1.png' : '/resources/SampleImg/heart.png';
       $(this).attr('src', newSrc);
   });
   $("#img_star").click(function() {
       var currentSrc = $(this).attr('src');
       var newSrc = currentSrc === '/resources/SampleImg/star.png' ? '/resources/SampleImg/star_1.png' : '/resources/SampleImg/star.png';
       $(this).attr('src', newSrc);
   });
</script>

<script>
   var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
   var address = "${TourVO.address}"; // 여기에 원하는 주소를 입력하세요.
   console.log(address);
   var geocoder = new kakao.maps.services.Geocoder();

   geocoder.addressSearch(address, function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
         var options = {
            center: new kakao.maps.LatLng(result[0].y, result[0].x),
            level: 3
         };

         var map = new kakao.maps.Map(container, options);
         // 마커 생성
         var markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
         var marker = new kakao.maps.Marker({
            position: markerPosition
         });

         // 마커 지도에 추가
         marker.setMap(map);
      }
	});
</script>

<script>
   // 게시물수 따른 프로필변화
   var postCount = ${tripUser.write_cnt};
   // 게시물 수에 따라 이미지 변경
   var profileImage = document.getElementById('id_img');

   if (postCount >= 30) {
      profileImage.src = "/resources/images/3등급.png";
   } else if (postCount >= 15) {
      profileImage.src = "/resources/images/2등급.png";
   } else if (postCount >= 0) {
      profileImage.src = "/resources/images/1등급.png";
   } else {
      // 0보다 작은 경우에 대한 기본 이미지 설정
      profileImage.src = "/resources/images/1등급.png";
   } 
</script>

</body>
</html>