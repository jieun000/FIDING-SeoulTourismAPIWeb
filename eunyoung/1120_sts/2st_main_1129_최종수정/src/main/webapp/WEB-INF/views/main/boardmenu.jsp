<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>
	   
    <div class="main-content" id="main-content">
        <!-- 메인 컨텐츠 내용 -->
		<main>
		    <section id="destinations">
			    
			</section>
		</main>
	</div>
	<input type = "hidden" value="${searchValue}" id="search"/>
	<input type = "hidden" value="${selectValue}" id="select"/>
	
	
<!-- 메인에서 검색한거 받아오는 부분 -->
<!-- 재검색부분 -->
<script>
var page_num = 1;

function view(){
	var selectedValue = $("#select").val()
	var searchValue = $("#search").val()
	var data = {
		page_num : page_num,
		search : "",
		id: "",
		cat : ""
	};
	// AJAX 요청 보내기
	$.ajax({
		type : "post",
		url : "boardAll",
		data : JSON.stringify(data),
		dataType : "json",
		contentType:"application/json",
		success : function(data) {
			console.log("요청 성공", data);
			// 받은 데이터를 처리하여 HTML로 만들기
			var resultsHTML = "";
			var pageLength=data.length
			// 예시: 받은 데이터를 반복하여 동적으로 결과를 생성
			if (data.length>0) {
				for (var i = 0; i < data.length; i++) {
					var item = data[i];
	
					// 이미지, 제목, 설명을 가진 article 요소를 동적으로 생성
					var articleHTML = '<article class="destination">';
					articleHTML += '<img src="' + item.url + '" alt="' + item.title + ' 이미지 없음">';
					articleHTML += '<h2>' + item.title + '</h2>';
					articleHTML += '<p>' + item.nickname + '</p>';
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
		},
		error : function(error) {
			console.log("에러 발생", error);
		},
	});//ajax action
}

$(document).ready(function() {
	view();
	var span_tags = '';
	for (var i = 1; i <= 5; i++) {
		span_tags += '<span id="Pagebtn' + i+'" style="padding-right: 10px;">'+i+'</span>';
	}
	$("#destinationsButton").html(span_tags);
})
</script>

<script>
	// 헤더 클릭시 메인화면으로 돌아감
	function redirectToMain() {
		window.location.href = 'main';
	}
</script>
</body>
</html>

