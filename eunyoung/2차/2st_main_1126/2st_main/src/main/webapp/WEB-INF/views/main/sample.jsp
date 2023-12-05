<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<style type="text/css">
* {
	box-sizing: border-box;
	font-family: -apple-system, system-ul, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
	background-color: #fafafa;
}

.none {
	width: auto;
	height: 40px;
	padding-top: 75px;
	background-color: #fafafa;
}

article {
	position: relative;
	right: 0px;
	background-color: #fafafa;
	border-radius: 3px;
}

.main_body {
	display: flex;
	position: relative;
	text-align: center;
	justify-content: center;
	left: 20px;
}

.feed {
	width: 600px;
	height: auto;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
}

.id_box {
	display: flex;
	position: absolute;
	flex-direction: row;
	align-items: flex-start;
	justify-content: flex-start;
	left: 0px;
	top: 0px;
	width: 536px;
	height: 41px;
}

.id_container {
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: flex-start;
	left: 10px;
}

.id_img {
	width: 32px;
	height: 32px;
	border-radius: 50%;
}

.id_name {
	margin-bottom: 3px;
	font-size: 14px;
	font-weight: 600;
}

.place {
	font-size: 12px;
}

.more_details {
	position: relative;
	right: -550px;
}

.more_details img {
	display: flex;
	justify-content: flex-end;
	width: 40px;
	height: 40px;
}

.feed_picture {
	width: 598px;
	height: auto; /* 이미지 크기에 맞게 자동 조정 */
}

.feed_picture img {
    max-width: 100%; /* 이미지가 부모 요소에 맞게 크기 조절 */
    height: auto;
}
.emoticon_box {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	margin: 0px;
}

/* !!!!! 캐러셀 크기 !!!!! */
.carousel-container.carousel-inner {
	max-width: 598px; /* 이미지 크기에 맞게 조절 */
	margin: 0 auto; /* 가운데 정렬 */
}
.carousel-item img {
    margin: auto; /* 가운데 정렬을 위해 추가 */
}

/* !!!!! 캐러셀 높이 조절 !!!!! */
.carousel-item {
    height: 100%; /* 원하는 높이로 설정 */
}

.carousel-control-prev, .carousel-control-next {
    top: 50%; /* 상단 중앙 정렬 */
    transform: translateY(-50%);
}
.emoticon_box2 {
	display: flex;
}

.emoticon_box2 div {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	margin: 0px;
}

.emoticon_box2 img {
	width: 24px;
	height: 24px;
}

.bookmark_box {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
}

.bookmark_box img {
	width: 24px;
	height: 24px;
}

.feed_like_box {
	display: flex;
	position: relative;
	flex-direction: row;
	align-items: center;
	height: 30px;
	left: 8px;
	padding: 0 16px 0 8px;
}

.feed_like_box .feed_like {
	display: flex;
	position: relative;
	left: 5px;
	font-size: 14px;
}

.feed_like_picture {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	top: 15px;
	left: 10px;
	border: 1px solid #dbdbdb;
}

.feed_like_peolpe {
	width: 20px;
	height: 20px;
	border-radius: 50%;
}

.feed_article {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
}

.feed_article_box {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	padding: 0 16px 0 16px;
}

.comments_container {
	display: flex;
}

.comments {
	font-size: 14px;
	line-height: 18px;
	padding: 2px;
}

.comments1 {
	padding: 2px;
	font-size: 14px;
	line-height: 18px;
	color: #8e8e8e;
}

.comments1_box {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
}

.new_comments {
	display: block;
	text-align: start;
}

.newCommentBox {
	padding: 2px;
	font-size: 14px;
	line-height: 18px;
}

.newCommentBox1 {
	padding: 2px;
	font-size: 14px;
	line-height: 18px;
}

.comments2 {
	font-size: 10px;
	line-height: 18px;
	color: #8e8e8e;
	letter-spacing: 0.2px;
}

.inputContainer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 56px;
	padding: 0 12px 0 12px;
	margin: 0px;
	border-top: 1px solid #efefef;
}

.inputBox {
	background-color: #fafafa;
	font: 14px;
	color: black;
	outline: none;
	width: 550px;
	height: 50px;
	border: solid 0px;
}

.buttonBox {
	background-color: #fafafa;
	color: #c0e0fd;
	outline: none;
	border: solid 0px;
}

.type_comment {
	display: flex;
	justify-content: flex-start;
	width: 530px;
	font-size: 14px;
	color: #8e8e8e;
}

.summit {
	font-size: 14px;
	color: #bee1fd;
}
</style>
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script>
    $(document).ready(function () {
        // 이미지 슬라이더를 초기화합니다.
       $('#carouselExampleIndicators').carousel(); // 주석 해제
    });
</script>
</head>
<body>
  <!--body-->
  <div class="none"></div>
  <div class="main_body">
    <article>
      <div class="empty_box"></div>
      <div class="feed">
        <div class="feed_id">
          <div class="id_round">
            <div class="id_box">
              <div class="id_box_img">
                <img class="id_img" src="/resources/SampleImg/picture8.png" alt="내 프로필">
              </div>
              <div class="id_container">
                <div class="id_name">HAHA</div>
                <div class="place">#얼굴 천재 #차은우</div></div>
              </div>
            </div>
            <div class="more_details">
              <img src="/resources/SampleImg/more.png" alt="더보기">
            </div>
          </div>
        </div>
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
        <!--feedbottom-->
        <div class="feed_bottom">
          <div class="emoticon_box">
            <div class="emoticon_box2">
              <div class="heart_box">
                <img class="heart" src="/resources/SampleImg/heart.png" alt="하트">
              </div>
              <div class="comment_box">
                <img class="coment" src="/resources/SampleImg/comment.png" alt="코멘트" />
              </div>
              <div class="direct_box">
                <img class="direct" src="/resources/SampleImg/direct.png" alt="종이비행기" />
              </div>
            </div>
            <div class="bookmark_box">
              <img class="bookmark" src="/resources/SampleImg/bookmark.png" alt="공유" />
            </div>
          </div>
        </div>
    </article>
    </div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>