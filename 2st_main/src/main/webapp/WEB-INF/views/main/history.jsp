<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>
    
    <div class="main-content" id="main-content">
        <!-- 메인 컨텐츠 내용 -->
		<main>
		    <section id="destinations">
			    
			</section>
			<section id="destinationsButton" style="text-align: center;">
			</section>
		</main>
	</div>
	<input type = "hidden" value="서울" id="search"/>
	<input type = "hidden" value="${selectValue}" id="select"/>
	
	
<!-- 메인에서 검색한거 받아오는 부분 -->
<!-- 재검색부분 -->
<script type="text/javascript">
	$("#categorySelect option:eq(2)").prop("selected", true);
	$('#searchInput').attr('placeholder','역사 관련 입력어를 입력하세요.');
	var selectedValue = "A02&A0201";
	var searchValue = $("#search").val();
	var page_num = "1";
	var pageLength = 0;
	console.log(searchValue);
	console.log(selectedValue);
	// 셀렉트 박스의 값이 변경되었을 때
	$("#categorySelect").change(function(){
		// 선택된 값 가져오기
		selectedValue = $("#categorySelect").val();
		console.log(selectedValue);
	});
	$("#searchIcon").click(function(){
		searchValue = $("#searchInput").val();
		api_search_data(searchValue,selectedValue);
	});
	document.addEventListener("keydown", function(event) {
		if (event.which === 13) {
			searchValue = $("#searchInput").val();
		    api_search_data(searchValue,selectedValue);
		}
	})
	// apiSearch 페이지
	$(document).ready(function () {
		api_search_data(searchValue,selectedValue);
	});
	
	function api_search_data() {
		
		console.log(searchValue,selectedValue);
		var data={
			numOfRows: "9",
			pageNo: page_num,
			MobileOS: "WIN",
			MobileApp: "seoultrip",
			_type: "json",
			keyword: searchValue,
			cat1: selectedValue.split("&")[0],
			areaCode: "1",
			serviceKey: "service_key+QAiQh+sq0X1DIXbC6KuT6AD9jFCqQ3xT8Y+kVNpXWHSibyA==",
			// 여기에 선택된 값 추가
			// 예: cat1=A02&cat2=A0201
			// 이 부분을 동적으로 설정하려면 서버에 맞게 값을 가공해야 합니다.
			//cat1: selectedValue.split("&")[0],
		};
		if (selectedValue.length>3) {
			data["cat2"]=selectedValue.split("&")[1];
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
				pageLength = data.response.body.totalCount;
				console.log("pageLength:", pageLength);
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
				createPaginationButtons(pageLength);
				r = $("article.destination")
	               r.click(function(e){
	                  var cat = $(this).find(".category").val();
	                  var categoryMappings = [
	                     { catCode: /^A01/, category: "자연" },
	                     { catCode: /^A0201/, category: "역사" },
	                     { catCode: /^A0202/, category: "관광" },
	                     { catCode: /^A0207/, category: "축제" },
	                     { catCode: /^A05/, category: "음식" }
	                  ];
	                  categoryMappings.some(mapping => {
	                     if (mapping.catCode.test(cat)) {
	                        cat = mapping.category;
	                        return true;
	                     }
	                     return false;
	                  });
	                  var data = {
	                     cat: cat,
	                     address: $(this).find("p").text(),
	                     search_cnt: 0,
	                     url: $(this).find("img").attr("src")
	                  };
	                  console.log(data);
	                  $.ajax({
	                     type: "post",
	                     url: "insertTour",
	                     data: JSON.stringify(data),
	                     // dataType: "json",
	                     contentType:"application/json",
	                     success: function (TL_NO) {
	                        console.log("요청 성공", TL_NO);
	                        window.location.href = "/trip/writeBoard?TL_NO=" + TL_NO;
	                     },
	                     error: function (error) {
	                        console.log("에러 발생: ", error);
	                     }
	                  }); // ajax
	               });// click 이벤트
		    },
			error: function (error) {
			  console.log("에러 발생", error);
			},
		});
	};
	
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
	        api_search_data();
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
</body>
</html>