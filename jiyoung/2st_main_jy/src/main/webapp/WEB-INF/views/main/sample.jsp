<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>
    
    <div class="main-content" id="main-content">
       <div class="main_body">
        <article>
         <div class="feed">
              <div class="feed_id">
               <div class="id_round">
                  <div class="id_box">
                     <div class="id_box_img">
                        <img class="id_img" src="/resources/SampleImg/picture8.png" alt="내 프로필">
                     </div>
                     <div class="id_container">
                        <div class="id_name">HAHA</div>
                     </div>
                  </div>
               </div>
               <div class="more_details">
                  <!-- 이미지 클릭 시 모달 열리도록 하는 코드 -->
                  <img src="/resources/SampleImg/more.png" alt="더보기" style="cursor: pointer;" onclick="openMoreOptionsModal()">
                     
                  <!-- 모달 정의 -->
                  <div class="modal fade" id="moreOptionsModal" tabindex="-1" aria-labelledby="moreOptionsModalLabel" aria-hidden="true">
                     <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="moreOptionsModalLabel">수정 및 삭제</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                              <div class="modal-body">
                                <!-- 여기에 수정 및 삭제 버튼 또는 폼을 추가하세요 -->
                                <button type="button" class="btn btn-success" onclick="editFunction()">수정</button>
                                <button type="button" class="btn btn-danger" onclick="deleteFunction()">삭제</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="feed_2">
            <div id="carouselExampleIndicators" class="carousel slide">
                 <div class="carousel-indicators">
                   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
               </div>
               <div class="carousel-container carousel-inner">
                   <div class="feed_picture carousel-item active">
                     <img src="/resources/SampleImg/picture7.png" class="gallery-image d-block w-50" alt="피드 사진">
                   </div>
                   <div class="feed_picture carousel-item">
                     <img src="/resources/SampleImg/picture10.png" class="gallery-image d-block w-50" alt="다른 피드 사진">
                   </div>
               </div>
               <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                   <span class="visually-hidden">Previous</span>
               </button>
               <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                   <span class="carousel-control-next-icon" aria-hidden="true"></span>
                   <span class="visually-hidden">Next</span>
                </button>
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
             <div class="feed_like_box">
                 <div class="feed_like">제목</div>
             </div>
         </div>
         <div class="feed">   
            <div class="feed_article">
               <div class="feed_article_box">
                  <div class="comments_container">
                     <div class="comments" style="height: auto;">본문</div>
                  </div>
               </div> 
            </div>
         </div>
      </article>
   </div>
</div>

<script>
	//헤더 클릭시 메인화면으로 돌아감
	function redirectToMain() {
		window.location.href = 'trip/main';
}
</script>
    	
</body>
</html>