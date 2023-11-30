<%@page import="com.seoul.fiding.vo.BoardVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*,javax.sql.*" %>
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
                        <img class="id_img" id="id_img" src="/resources/images/1등급.png" alt="내 프로필">
                           </div>
                           <div class="id_container">
                              <div class="id_name">${tripUser.username}</div>
                                <input type="hidden" id="bd_no" value="${boardVO.BD_NO}" />
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
                        <img src="${boardVO.url}" class="gallery-image" alt="피드 사진 1" style="height:1000px; width: 600px;">
                     </div>
                     <div class="feed_picture carousel-item">
                        <div id="map" class="gallery-image" style="height:600px;"></div>   
                     </div>
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
                        <img class="heart" id="img_heart" src="/resources/SampleImg/heart.png" alt="좋아요">
                     </div>
                     <div class="comment_box">
                        <img class="coment" id="img_star" src="/resources/SampleImg/star.png" alt="즐겨찾기" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
         <!--/feedbottom-->
         <div class="feed_2">       
            <div class="feed_like">${boardVO.title}</div>
         </div>
         <div class="feed_2">  
            <div class="feed_like">${boardVO.content}</div>
         </div>
         <div class="feed_article">
            <div class="feed_article_box">
               <div class="comments_container">
                  <div class="comments" style="height: auto;">
                     <div id="tagList" style="padding: 5px 0"></div>
                  </div>
               </div>
            </div> 
         </div>

      </div>
   </div>
</div>
<input id="tags" type="hidden" value="${boardVO.tag}"/>

<script>
var tag_list = $("#tags").val().split("#");
var span_tags = '';
for (var i=1; i<tag_list.length; i++) span_tags += '<span style="padding-right: 10px;">#'+tag_list[i]+'</span>';
$("#tagList").html(span_tags);
</script>


  <script>
  var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  var options = { //지도를 생성할 때 필요한 기본 옵션
     center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
     level: 3 //지도의 레벨(확대, 축소 정도)
  };

  var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
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
      window.location.href = '/trip/main';
}
   function openMoreOptionsModal() {
       // 모달을 열기 위해 Bootstrap의 modal 함수 호출
       $('#moreOptionsModal').modal('show');
   }

   function editFunction() {
       // 수정 로직을 여기에 추가
       alert('수정 하시겠습니까?');
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
   var bd_NO = $("#bd_no").val();   
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
       var userConfirmed = confirm('수정 하시겠습니까?');
       
       if (userConfirmed) {
           closeMoreOptionsModal(); // 원하는 동작 후 모달 닫기
           window.location.href = '/trip/boardUpdate?BD_NO=' + bd_NO;
       }
   }

   // 취소 버튼 클릭 시 원래 페이지로 돌아가는 동작
   function handleCancel() {
       // 여기에 원래 페이지의 URL을 지정하여 페이지 이동 코드를 추가합니다.
       window.location.href = "/trip/boardPage";
   }

    // 삭제 버튼 클릭 시 동작
    function handleDelete() {
       var userConfirmed = confirm('삭제 하시겠습니까?');
      
        if (userConfirmed) {
           
            closeMoreOptionsModal(); // 원하는 동작 후 모달 닫기
            window.location.href = "/trip/boardDelete?bno=" + bd_NO;
        }
    }
    // 취소 버튼 클릭 시 원래 페이지로 돌아가는 동작
    function deleteCancel() {
       
        // 여기에 원래 페이지의 URL을 지정하여 페이지 이동 코드를 추가합니다.
        window.location.href = "/trip/mypost";
    }
    
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
  <input type='text' value="${BD_NO}"/>
  
</body>
</html>