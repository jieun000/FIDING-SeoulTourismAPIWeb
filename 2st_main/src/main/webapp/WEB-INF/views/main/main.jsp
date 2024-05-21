<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>
    
    <div class="main-content" id="main-content">
        <!-- 메인 컨텐츠 내용 -->
        <div class="wrap" onmouseover="pauseBanner()" onmouseout="resumeBanner()"> <!-- 배너표시영역 -->
        	<div class="rolling-list"> <!-- 원본배너 -->
	            <ul>
	            	
	                <li>
	                    <div class="image-wrap"><img src="/resources/images/main1.jpg" alt=""></div>
	                </li>
	                <li>
	                    <div class="image-wrap"><img src="/resources/images/main2.jpg" alt=""></div>
	                </li>
	                <li>
	                    <div class="image-wrap"><img src="/resources/images/main3.jpg" alt=""></div>
	                </li>
	                <iframe width="500" height="300" src="https://www.youtube.com/embed/lF1P-nH2oTw" title="방구석 힐링 투어! 서울도보해설관광 체험영상_경복궁편" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
			<section id="destinationsButton" style="text-align: center;">
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
	});
	document.addEventListener("keydown", function(event) {
		if (event.which === 13) {
			searchValue = $("#searchInput").val();
			$("#apiSearchForm input").eq(0).val(selectedValue);
		    $("#apiSearchForm input").eq(1).val(searchValue);
		    $('#api').trigger('click');
		}
	});
</script>

<script>
	var page_num = 1;
	var selectedValue=""
	var searchValue=""
	var user_id=$("#user_id").val();
	var pageLength = 0;
	
	var url="boardAll2"
	view();
	// 셀렉트 박스의 값이 변경되었을 때
	$("#searchIcon").click(function() {
		url="boardSearch2";
		selectedValue = $("#categorySelect").val();
		searchValue = $("#searchInput").val();
		view();
	});
	document.addEventListener("keydown", function(event) {
	   if (event.which === 13) {
			url="boardSearch2";
			selectedValue = $("#categorySelect").val();
			searchValue = $("#searchInput").val();
			view();
	   }})
	function view() {
		
		var data = {
			page_num : page_num,
			search : searchValue,
			id: user_id,
			cat : selectedValue
		};
		console.log(data)
		console.log(url)
		// AJAX 요청 보내기
		$.ajax({
			type : "post",
			url : url,
			data : JSON.stringify(data),
			dataType : "json",
			contentType:"application/json",
			success : function(data) {
				console.log("요청 성공", data);
				// 받은 데이터를 처리하여 HTML로 만들기
				var resultsHTML = "";
				pageLength=data.length
				// 예시: 받은 데이터를 반복하여 동적으로 결과를 생성
				if (data.length>0) {
					for (var i = 0; i < data.length; i++) {
						var item = data[i];
						pageLength = data[0].length
						console.log("pageLength:", pageLength)
		
						// 이미지, 제목, 설명을 가진 article 요소를 동적으로 생성
						var articleHTML = '<article class="destination">';
						articleHTML += '<img src="' + item.url + '" alt="' + item.title + ' 이미지 없음">';
						articleHTML += '<h2>' + item.title + '</h2>';
						articleHTML += '<p>' + item.nickname + '</p>';
						articleHTML += '<input type="hidden" value="' + item.bd_NO + '">';
						articleHTML += '</article>';
		
						// 결과를 페이지의 #destinations 요소에 추가
						resultsHTML += articleHTML;
					}
				} else {
					// 검색 결과가 없는 경우
					resultsHTML = '<div class="no-results"><p>검색 결과가 없습니다.<p></div>';
				}
		
				// 결과를 페이지의 #destinations 요소에 추가
				$("#destinations").html(resultsHTML);
				createPaginationButtons(pageLength);
					page_i = $("article.destination")
					page_i.click(function(e) {
				    // 성공시
				    console.log("성공");
				
				    // 현재 클릭된 article 요소에서 input 요소를 찾아서 값을 가져옴
				    var bd_NO = $(this).find("input").val();
				    console.log("BD_NO: " + bd_NO);
					// 페이지 이동
				    window.location.href = '/trip/boardPage?BD_NO=' + bd_NO;
				});
			},
			error : function(error) {
				console.log("에러 발생", error);
			}
		}); //ajax action
	}
 	function createPaginationButtons(pageLength) {
	    var numButtons = Math.ceil(pageLength / 9);
	    var paginationHTML = '';

	    if (numButtons > 1) {
	        paginationHTML += '<span class="page-btn_arrow" onclick="goToPage(' + (page_num > 1 ? page_num - 1 : 1) + ')">&lt;</span>';
	    }

	    var startPage = Math.max(1, Math.min(page_num - 2, numButtons - 4));
	    var endPage = Math.min(startPage + 4, numButtons);

	    for (var i = startPage; i <= endPage; i++) {
    	 for (var i = startPage; i <= endPage; i++) {
    	        if (i === parseInt(page_num)) {
    	            paginationHTML += '<span class="page-btn current-page" onclick="goToPage(' + i + ')">' + i + '</span>';
    	        } else {
    	            paginationHTML += '<span class="page-btn" onclick="goToPage(' + i + ')">' + i + '</span>';
    	        }
    	    }
		}

	    if (numButtons > 1) {
	        paginationHTML += '<span class="page-btn_arrow" onclick="goToPage(' + (page_num < numButtons ? Number(page_num) + Number(1) : numButtons) + ')">&gt;</span>';
	    }

	    $("#destinationsButton").html(paginationHTML);
	}

	function goToPage(page) {
	    var totalPages = Math.ceil(pageLength / 9);
	    if (page >= 1 && page <= totalPages && page !== parseInt(page_num) || page > parseInt(page_num)) {
	        page_num = String(page);
	        view();
	    }
	}
</script>
<style>
.page-btn { 
   margin: 0px 5px;
   padding: 5px 10px;
   border: 1px solid blue;
   border-radius: 50%;
}
.page-btn:hover {
   color: gray;
   cursor: pointer;
}
.page-btn_arrow:hover {
   color: gray;
   cursor: pointer;
}
.page-btn_arrow { 
   margin: 0px 5px;
   padding: 7px;
}
.page-btn.current-page {
    color: deeppink;
}
</style>
<script>
/* 	$(document).ready(function() {
		view();
		var span_tags = '';
		for (var i = 1; i <= 5; i++) {
			span_tags += '<span id="Pagebtn' + i+'" style="padding-right: 10px;">'+i+'</span>';
		}
		$("#destinationsButton").html(span_tags);
	}) */
</script>
	<form action='/trip/apiSearch' method="post" id="apiSearchForm">
		<input type='hidden' name='selectedValue'/>
		<input type='hidden' name='searchValue'/>
		<input type='submit' id='api'/>
	</form>
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