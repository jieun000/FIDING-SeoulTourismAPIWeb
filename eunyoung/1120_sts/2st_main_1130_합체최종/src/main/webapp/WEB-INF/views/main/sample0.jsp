<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>제목을 입력하세요</title>
    <script src="https://kit.fontawesome.com/8a075d4b91.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
</head>
<body>
    <div id="translateBody">
        <i class="fa-solid fa-earth-americas" onclick="translateText()"></i>
        <p>첫째 줄이고</p>
        <p>둘째줄</p>
        <div>
            <a href="www.naver.com">여기는 a태그이다.</a>
            <b>여기는 b태그.</b>
        </div>
        <input type="text" value="input창" /> <br>
        <span>span태그이다.</span>
    </div>
    
<script>
	var saveOriginalTextList = []; // 원본 텍스트
	var translateStr = ""; // 서버 호출을 위한 모든 텍스트 문자열
	var translateCnt = false; // 번역 전 후 표시 플래그

	// 원본 텍스트로 복원하는 함수
	function OriginalText() {
	    $("#translateBody").find("*").contents().filter((index, self) => {
	        return self.nodeType === 3 && $(self).replaceWith(document.createTextNode(saveOriginalTextList.shift()));
	    });
	    translateCnt = false;
	};
   
	// 서버에 텍스트 번역을 요청하는 함수
	function translateTextMethod(translateText) {
	    return $.ajax({
	        type: "POST",
	        url: "/translate2",
	        data: { original: translateText }, // 호출 성공시 번역 텍스트를 업데이트하는 함수 호출
	        success: data => updateTranslatedText(data.translated),
	        error: error => console.error("애러 메시지: ", error)
	    });
	};
      
	// 번역된 텍스트를 HTML에 업데이트하는 함수
	function updateTranslatedText(translatedText) {
		var translatedTextList = translatedText.split("\r\n");
		$("#translateBody").find("*").contents().filter(function () {
		    return this.nodeType === 3;
		}).each(function (index) {
		    var self = this;
		    $(self).replaceWith(document.createTextNode(translatedTextList[index]));
		});
	};

// 텍스트 번역 함수
function translateText() {
    if (!translateCnt) { // translateCnt가 false면 body 엘리먼트 내의 모든 텍스트 노드 선택
        $("#translateBody").find("*").contents().filter((index, self) => {
            if (self.nodeType === 3) { // 텍스트 노드만 선택
			    var originalText = $(self).text();
		      	saveOriginalTextList.push(originalText); // 원본 텍스트 저장
		      	translateStr += originalText + "\r\n";  // 번역을 위한 문자열 생성
            }
        });
        translateTextMethod(translateStr);
        translateCnt = true;
    } else {
    	// 번역 후이면 원본 텍스트로 복원하는 함수 호출
        OriginalText();
    };
};
</script>
</body>
</html>
