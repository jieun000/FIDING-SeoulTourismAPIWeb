<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>

    <div class="main-content" id="main-content">
       <div class="main_body">
        <div class="board_wrap">
         <div class="feed">
              <div class="feed_id">
               <div class="id_round">
               	<img src="/resources/SampleImg/more.png" alt="더보기" style="cursor: pointer; margin-left:530px;" onclick="openMoreOptionsModal()">
                  <div class="id_box">
                     <div class="id_box_img">
                        <img class="id_img" src="/resources/SampleImg/picture8.png" alt="내 프로필">
                     </div>
                     <div class="id_container">
                        <div class="id_name">HAHA</div>
                     </div>
                  </div>
            </div>
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
            
            
            
         <div class="feed_2">
         
         <!-- 캐러셀 -->
          <div class="feed_2">
             <div class="carousel-container">
               <div class="carousel-inner">
                 <div class="feed_picture carousel-item" >
                   <img src="/resources/SampleImg/picture7.png" class="gallery-image" alt="피드 사진 1" style="height:1000px; width: 450px;">
                 </div>
                 <div class="feed_picture carousel-item">
                   <img src="/resources/SampleImg/picture10.png" class="gallery-image" alt="다른 피드 사진 2" style="height:1000px; width: 450px;">
                 </div>
                 <!-- 추가적인 캐러셀 아이템은 이곳에 계속해서 추가할 수 있습니다. -->
               </div>
             </div>
             <button class="carousel-control" id="carousel-control-prev" onclick="prevSlide()">❮</button>
             <button class="carousel-control" id="carousel-control-next" onclick="nextSlide()">❯</button>
           </div>
        
         </div>
         <!--feedbottom-->
         <div class="feed_2">
            <div class="feed_bottom">
               <div class="emoticon_box">
                  <div class="emoticon_box2">
                     <div class="heart_box">
                        <img class="heart" id = "img_heart" src="/resources/SampleImg/heart.png" alt="좋아요">
                     </div>
                     <div class="comment_box">
                        <img class="coment" id = "img_star" src="/resources/SampleImg/star.png" alt="즐겨찾기" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <!--/feedbottom-->
          <div class="feed_2">       
          	<div class="feed_like">제목</div>
         </div>
         <div class="feed">   
            <div class="feed_article">
               <div class="feed_article_box">
                  <div class="comments_container">
                     <div class="comments" style="height: auto;">
                     	<div style="padding: 5px 0">본문</div>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
						<span style="padding-right: 10px;">#태그</span>
					</div>
                  </div>
               </div> 
            </div>
         </div>
      </div>
   </div>
</div>
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
   //헤더 클릭시 메인화면으로 돌아감
   function redirectToMain() {
      window.location.href = 'trip/main';
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
    // 모달 열기
    function openMoreOptionsModal() {
      document.getElementById("customModal").style.display = "block";
    }

    // 모달 닫기
    function closeMoreOptionsModal() {
      document.getElementById("customModal").style.display = "none";
    }

    // 수정 버튼 클릭 시 동작
    function handleUpdate() {
      alert("수정 버튼 클릭됨");
      closeMoreOptionsModal(); // 원하는 동작 후 모달 닫기
      window.location.href = "/trip/boardUpdate";
    }

    // 삭제 버튼 클릭 시 동작
    function handleDelete() {
      alert("삭제 버튼 클릭됨");
      closeMoreOptionsModal(); // 원하는 동작 후 모달 닫기
    }
  </script>
</body>
</html>