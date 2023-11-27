<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>
    
    <div class="main-content" id="main-content">
        <!-- 메인 컨텐츠 내용 -->
        <div class="wrap" onmouseover="pauseBanner()" onmouseout="resumeBanner()"> <!-- 배너표시영역 -->
        	<div class="rolling-list"> <!-- 원본배너 -->
	            <ul>
	            		<!--유튜브 <iframe width="500" height="300" src="https://www.youtube.com/embed/lF1P-nH2oTw" title="방구석 힐링 투어! 서울도보해설관광 체험영상_경복궁편" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
	                <li>
	                    <div class="image-wrap"><img src="/resources/images/main1.jpg" alt=""></div>
	                </li>
	                <li>
	                    <div class="image-wrap"><img src="/resources/images/main2.jpg" alt=""></div>
	                </li>
	                <li>
	                    <div class="image-wrap"><img src="/resources/images/main3.jpg" alt=""></div>
	                </li>
	                <li>
	                    <div class="image-wrap"><img src="/resources/images/main4.jpg" alt=""></div>
	                </li>
                	<li>
	                    <div class="image-wrap"><img src="/resources/images/main5.jpg" alt=""></div>
	                </li>
	                <li>
	                    <div class="image-wrap"><img src="/resources/images/main6.jpg" alt=""></div>
	                </li>
	                <li>
	                    <div class="image-wrap"><img src="/resources/images/main7.jpg" alt=""></div>
	                </li>
	                <li>
	                    <div class="image-wrap"><img src="/resources/images/main8.jpg" alt=""></div>
	                </li>
	            </ul>
       		</div>
    	</div>
    
    	<main>
		    <section id="destinations">
			    <article class="destination">
			        <img src="/resources/images/box1.jpg" alt="box1.jpg">
			        <h2>강아지1</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination">
			        <img src="/resources/images/box2.jpg" alt="box2.jpg">
			        <h2>강아지2</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination">
			        <img src="/resources/images/box3.jpg" alt="box3.jpg">
			        <h2>강아지3</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination">
			        <img src="/resources/images/box4.jpg" alt="box4.jpg">
			        <h2>강아지4</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination">
			        <img src="/resources/images/box5.jpg" alt="box5.jpg">
			        <h2>강아지5</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination">
			        <img src="/resources/images/box6.jpg" alt="box6.jpg">
			        <h2>강아지6</h2>
			        <p>Some description</p>
			    </article>
			</section>
		</main>
	</div>
	
<!-- 배너부분 -->
<script type="text/javascript">
	console.log('세션 ID:', '<%= request.getSession(false).getId() %>'); 
	// 롤링 배너 복제본 생성
	let roller = document.querySelector('.rolling-list');
	roller.id = 'roller1'; // 아이디 부여
	
	let clone = roller.cloneNode(true)
	// cloneNode : 노드 복제. 기본값은 false. 자식 노드까지 복제를 원하면 true 사용
	clone.id = 'roller2';
	document.querySelector('.wrap').appendChild(clone); // wrap 하위 자식으로 부착
	
	document.querySelector('#roller1').style.left = '0px';
	document.querySelector('#roller2').style.left = document.querySelector('.rolling-list ul').offsetWidth + 'px';
	// offsetWidth : 요소의 크기 확인(margin을 제외한 padding값, border값까지 계산한 값)
	
	roller.classList.add('original');
	clone.classList.add('clone');
	
	function pauseBanner() {
	    document.querySelector('.rolling-list').style.animationPlayState = 'paused';
	    document.querySelector('.clone').style.animationPlayState = 'paused';
	}
	
	function resumeBanner() {
	    document.querySelector('.rolling-list').style.animationPlayState = 'running';
	    document.querySelector('.clone').style.animationPlayState = 'running';
	}
</script>
<!-- 메인 api 검색부분 -->
<script>
	var selectedValue = ""
	var searchValue = ""
	// 셀렉트 박스의 값이 변경되었을 때
	$("#categorySelect").change(function(){
	// 선택된 값 가져오기
		selectedValue = $("#categorySelect").val();
	});
	$("#searchIcon").click(function(){
		searchValue = $("#searchInput").val();
		$("#apiSearchForm input").eq(0).val(selectedValue);
	    $("#apiSearchForm input").eq(1).val(searchValue);
	    $('#api').trigger('click');
	})
	document.addEventListener("keydown", function(event) {
		if (event.which === 13) {
			searchValue = $("#searchInput").val();
			$("#apiSearchForm input").eq(0).val(selectedValue);
		    $("#apiSearchForm input").eq(1).val(searchValue);
		    $('#api').trigger('click');
		}
	})

</script>
	<form action='/trip/apiSearch' method="post" id="apiSearchForm">
		<input type='hidden' name='selectedValue'/>
		<input type='hidden' name='searchValue'/>
		<input type='submit' id='api'/>
	</form>
	
<script>
	//헤더 클릭시 메인화면으로 돌아감
	function redirectToMain() {
		window.location.href = 'main';
}
</script>

<script>
    // 가상의 게시물 수 (이 부분을 실제 게시물 수로 변경해야 합니다)
    var postCount = ${tripUser.write_cnt};

    // 게시물 수에 따라 이미지 변경
    var profileImage = document.getElementById('profileImage');

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



 <!-- 서치바 
<script type="text/javascript">
$(".default_option").click(function(){
	$(".dropdown ul").addClass("active");
});

$(".dropdown ul li").click(function(){
	var text = $(this).text();
	$(".default_option").text(text);
	$(".dropdown ul").removeClass("active");
});
</script> 
-->
</body>
</html>