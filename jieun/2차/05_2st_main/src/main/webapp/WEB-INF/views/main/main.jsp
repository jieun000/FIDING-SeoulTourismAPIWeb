<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>

	<div class="menu-bar">
        <!-- 메뉴바 내용 -->
        <div class="my-box">
        	<ul>
        		<li>이름</li>
        		<li>닉네임</li>
        		<li>작성한 게시물 수</li>
        		<form action='/member/logout'>
        			<input type='submit' value='logout'>
        		</form>
        	</ul>
        </div>
        	<div class="menu-list">
		        <ul>
		            <li >내 게시물</li>
		        <!-- 추가적인 메뉴 항목들 -->
		            <li>즐겨찾기</li>
		            <li>게시판</li>
		            <li>맛집 목록</li>
		            <li>유적지 목록</li>
		        </ul>
	        </div>
    </div>
    
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
			</section>
			
			<section id="destinations">
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

    
    <script type="text/javascript">
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
</body>
</html>