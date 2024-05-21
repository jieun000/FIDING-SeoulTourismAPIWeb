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
<input type="hidden" value="${searchValue}" id="search"/>
<input type="hidden" value="${selectValue}" id="select"/>
<input type="hidden" value="${tripUser.id}" id="userid" />
<script>
   var page_num = 1;
   var selectedValue = "";
   var searchValue = "";
   var user_id = $("#userid").val();
   var url = "favorPost";
   var pageLength = 0;
   console.log("요청 성공");
   view();

   $("#searchIcon").click(function(){
      url = "boardSearch2";
      selectedValue = $("#categorySelect").val();
      searchValue = $("#searchInput").val();
      view();
   });
   document.addEventListener("keydown", function(event) {
      if (event.which === 13) {
         url = "boardSearch2";
         selectedValue = $("#categorySelect").val();
         searchValue = $("#searchInput").val();
         view();
      };
   });
   function view() {
      var data = {
         page_num : page_num,
         search : searchValue,
         id: user_id,
         cat : selectedValue
      };
      // AJAX 요청 보내기
      $.ajax({
         type : "post",
         url : url,
         data : JSON.stringify(data),
         dataType : "json",
         contentType: "application/json",
         success : function(data) {
            console.log("요청 성공", data);
            // 받은 데이터를 처리하여 HTML로 만들기
            var resultsHTML = "";
            pageLength = data[0].length
            // 예시: 받은 데이터를 반복하여 동적으로 결과를 생성
            if (data.length>0) {
               for (var i = 0; i < data.length; i++) {
                  var item = data[i];
      
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
            page_i = $("article.destination");
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
         },
      }); //ajax action
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
</body>
</html>