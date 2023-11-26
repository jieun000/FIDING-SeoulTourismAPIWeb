<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>
    
    <div class="main-content" id="main-content">
        <!-- 메인 컨텐츠 내용 -->
		<main>
		    <section id="destinations">
			    <article class="destination">
			        <img id="img1" src="/resources/images/box1.jpg" alt="box1.jpg">
			        <h2>강아지1</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination">
			        <img id="img2" src="/resources/images/box2.jpg" alt="box2.jpg">
			        <h2>강아지2</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination">
			        <img id="img3" src="/resources/images/box3.jpg" alt="box3.jpg">
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
	<!-- 메인에서 검색한거 받아오는 부분 -->
	<script>
	// apiSearch 페이지
	$(document).ready(function () {
	    // 쿠키에서 결과 데이터를 가져옴
	    var decodedResults = decodeURIComponent(getCookie("results"));

	    // 결과를 페이지의 #destinations 요소에 추가
	    $("#destinations").html(decodedResults);
	});

	// 쿠키에서 변수 가져오기
	function getCookie(name) {
	    var value = "; " + document.cookie;
	    var parts = value.split("; " + name + "=");
	    if (parts.length === 2) {
	        return parts.pop().split(";").shift();
	    }
	    return null;
	}
	</script>
	<!-- 재검색부분 -->
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
</body>
</html>