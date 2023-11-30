<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>
   <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    
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
   function sleep(sec) {
      let start = Date.now(), now = start;
      while (now - start < sec * 1000) {
         now = Date.now();
      }
   }

   var r=null;
   var selectedValue = $("#select").val()
   var searchValue = $("#search").val()
   var data=null;
   console.log(searchValue)
   console.log(selectedValue)
   
   
   $(document).ready(function() {
      // article 요소에 클릭 이벤트 등록
      function api_search_data(searchValue){
         // console.log(data)
         console.log(searchValue,selectedValue)
         var data={
               numOfRows: "9",
               pageNo: "1",
               MobileOS: "WIN",
               MobileApp: "seoultrip",
               _type: "json",
               keyword: searchValue,
               cat1: selectedValue.split("&")[0],
               areaCode: "1",
               serviceKey: "DE4NA2l9i2XDo2GEmrAOONhVxeolPbxNBMC12h+QAiQh+sq0X1DIXbC6KuT6AD9jFCqQ3xT8Y+kVNpXWHSibyA==",
               // 여기에 선택된 값 추가
               // 예: cat1=A02&cat2=A0201
               // 이 부분을 동적으로 설정하려면 서버에 맞게 값을 가공해야 합니다.
               //cat1: selectedValue.split("&")[0],
         };
         if (selectedValue.length>3) {
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
               if(data.response==null) return 
               if (data.response.body.items && data.response.body.items.item) {
                  for (var i = 0; i < data.response.body.items.item.length; i++) {
                     var item = data.response.body.items.item[i];
      
                     // 이미지, 제목, 설명을 가진 article 요소를 동적으로 생성
                     var articleHTML = '<article class="destination">';
                     articleHTML += '<img src="' + item.firstimage + '" alt="' + item.title + ' 이미지 없음">';
                     articleHTML += '<h2 class ="target_title">' + item.title + '</h2>';
                     articleHTML += '<p>' + item.addr1 + '</p>';
                     articleHTML += '<input type="hidden" class="category" value="' + item.cat2 + '" />';
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
            }, // success
            error: function (error) {
               console.log("에러 발생", error);
            },
         }); // ajax
      };//api search

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
      
      function tourInsert(data) {
         $.ajax({
            type: "post",
            url: "insertTour",
            data: data,
            dataType: "json",
            success: function (data) {
               console.log("요청 성공", data);
               // 페이지 이동
               // window.location.href = '게시물작성페이지컨트롤러';
             },
            error: function (error) {
              console.log("에러 발생: ", error);
            },
         });
      }
      api_search_data(searchValue,selectedValue)
      console.log("사랑")
      sleep(1)
      
      rrr = $("article")
      console.log('r',r,rrr)
   });
</script>
<script>
   // 헤더 클릭시 메인화면으로 돌아감
   function redirectToMain() {
      window.location.href = 'main';
   }
</script>
</body>
</html>