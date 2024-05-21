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
<script type="text/javascript">
	var selectedValue = $("#select").val()
	var searchValue = $("#search").val()
	console.log(searchValue)
	console.log(selectedValue)
	// 셀렉트 박스의 값이 변경되었을 때
	$("#categorySelect").change(function(){
	// 선택된 값 가져오기
		selectedValue = $("#categorySelect").val();
		console.log(selectedValue)
	});
	$("#searchIcon").click(function(){
		searchValue = $("#searchInput").val();
		api_search_data(searchValue,selectedValue)
	});
	document.addEventListener("keydown", function(event) {
		if (event.which === 13) {
			searchValue = $("#searchInput").val();
		    api_search_data(searchValue,selectedValue)
		}
	})
	// apiSearch 페이지
	$(document).ready(function () {
		api_search_data(searchValue,selectedValue)
	});
	
	function api_search_data(searchValue){
		
		console.log(searchValue,selectedValue)
		var data = {
			numOfRows: "9",
			pageNo: "1",
			MobileOS: "WIN",
			MobileApp: "seoultrip",
			_type: "json",
			keyword: searchValue,
	
			areaCode: "1",
			serviceKey: "service_key+QAiQh+sq0X1DIXbC6KuT6AD9jFCqQ3xT8Y+kVNpXWHSibyA==",
			// 여기에 선택된 값 추가
			// 예: cat1=A02&cat2=A0201
			// 이 부분을 동적으로 설정하려면 서버에 맞게 값을 가공해야 합니다.
			//cat1: selectedValue.split("&")[0],
		};
		//if (selectedValue.length>3){
		//	data["cat2"]=selectedValue.split("&")[1]
		//}
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
				if (data.response.body.items && data.response.body.items.item) {
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
				}

		        // 결과를 페이지의 #destinations 요소에 추가
		        $("#destinations").html(resultsHTML);
		    },
			error: function (error) {
			  console.log("에러 발생", error);
			},
		});
	};
</script>
<script>
	// 헤더 클릭시 메인화면으로 돌아감
	function redirectToMain() {
		window.location.href = 'main';
	}
</script>
</body>
</html>
