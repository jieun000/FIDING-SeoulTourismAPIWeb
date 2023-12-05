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
<script type="text/javascript">
	var selectedValue = ""
	var searchdValue = ""
	// 셀렉트 박스의 값이 변경되었을 때
	$("#categorySelect").change(function(){
	// 선택된 값 가져오기
		selectedValue = $("#categorySelect").val();
	});
	$("#searchIcon").click(function(){
		api_search_data()
	});
   
function api_search_data(){
	searchdValue = $("#searchInput").val();
	var data={
	        numOfRows: "6",
	        pageNo: "1",
	        MobileOS: "WIN",
	        MobileApp: "seoultrip",
	        _type: "json",
	        keyword: searchdValue,
	
	        areaCode: "1",
	        serviceKey: "DE4NA2l9i2XDo2GEmrAOONhVxeolPbxNBMC12h+QAiQh+sq0X1DIXbC6KuT6AD9jFCqQ3xT8Y+kVNpXWHSibyA==",
	        // 여기에 선택된 값 추가
	        // 예: cat1=A02&cat2=A0201
	        // 이 부분을 동적으로 설정하려면 서버에 맞게 값을 가공해야 합니다.
	        cat1: selectedValue.split("&")[0],
	      };
	if (selectedValue.length>3){
		data["cat2"]=selectedValue.split("&")[1]
	}
	// AJAX 요청 보내기
	$.ajax({
	    type: "get",
	    url: "https://apis.data.go.kr/B551011/KorService1/searchKeyword1",
	    data: data,
	    dataType: "json",
	    success: function (data) {
	        console.log("요청 성공", data);

	        // 받은 데이터를 처리하여 HTML로 만들기
	        var resultsHTML = "";

	        // 예시: 받은 데이터를 반복하여 동적으로 결과를 생성
	        if (data.response.body.items) {
	            for (var i = 0; i < data.response.body.items.item.length; i++) {
	                var item = data.response.body.items.item[i];

	                // 이미지, 제목, 설명을 가진 article 요소를 동적으로 생성
	                var articleHTML = '<article class="destination">';
	                articleHTML += '<img src="' + item.firstimage + '" alt="' + item.title + ' 이미지 없음">';
	                articleHTML += '<h2>' + item.title + '</h2>';
	                articleHTML += '<p>' + item.addr1 + '</p>';
	                articleHTML += '</article>';

	                // 결과를 페이지의 #destinations 요소에 추가
	                resultsHTML += articleHTML;
	            }
	        } else {
	            // 검색 결과가 없는 경우
	            resultsHTML = '<div class="no-results"><p>검색 결과가 없습니다.<p></div>';
	            // 결과를 페이지의 #destinations 요소에 추가
	            $("#destinations").html(resultsHTML);
	        }

	        // 결과를 쿠키에 저장
	        document.cookie = "results=" + encodeURIComponent(resultsHTML);

	        // 새로운 페이지로 이동
	        window.location.href = "apiSearch";
	    },
	    error: function (error) {
	        console.log("에러 발생", error);
	    },
	});
};
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