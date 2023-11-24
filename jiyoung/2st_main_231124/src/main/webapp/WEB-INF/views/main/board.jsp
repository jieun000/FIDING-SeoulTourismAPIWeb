<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>

	<link rel="stylesheet" type="text/css" href='/resources/css/board.css' />

	<div class="menu-bar">
        <!-- 메뉴바 내용 -->
        <div class="my-box">
        	<ul>
        		<li>이름</li>
        		<li>닉네임</li>
        		<li>작성한 게시물 수</li>
        		
        	</ul>
        </div>
        	<div class="menu-list">
	            <ul>
                  <li >💗 내 게시물</li>
              <!-- 추가적인 메뉴 항목들 -->
                  <li>💛 즐겨찾기</li>
                  <li>💚 게시판</li>
                  <li>💙 맛집 목록</li>
                  <li>💜 유적지 목록</li>
              </ul>
     		</div>
     		<div class="parent-container">
			  <form action='/member/logout'>
			    <input type='submit' value='logout'>
			  </form>
			</div>
    </div>
</head>
<body>
<main>
		    <section id="destinations2">
			    <article class="destination2">
			        <img id="img1" src="/resources/images/box1.jpg" alt="box1.jpg">
			        <h2>강아지1</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination2">
			        <img id="img2" src="/resources/images/box2.jpg" alt="box2.jpg">
			        <h2>강아지2</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination2">
			        <img id="img3" src="/resources/images/box3.jpg" alt="box3.jpg">
			        <h2>강아지3</h2>
			        <p>Some description</p>
			    </article>
			</section>
			
			<section id="destinations2">
			    <article class="destination2">
			        <img id="img4" src="/resources/images/box4.jpg" alt="box4.jpg">
			        <h2>강아지4</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination2">
			        <img id="img5" src="/resources/images/box5.jpg" alt="box5.jpg">
			        <h2>강아지5</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination2">
			        <img id="img6" src="/resources/images/box6.jpg" alt="box6.jpg">
			        <h2>강아지6</h2>
			        <p>Some description</p>
			    </article>
			</section>
			
			<section id="destinations2">
			    <article class="destination2">
			        <img id="img7" src="/resources/images/box1.jpg" alt="box1.jpg">
			        <h2>강아지7</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination2">
			        <img id="img8" src="/resources/images/box2.jpg" alt="box2.jpg">
			        <h2>강아지8</h2>
			        <p>Some description</p>
			    </article>
			    <article class="destination2">
			        <img id="img9" src="/resources/images/box3.jpg" alt="box3.jpg">
			        <h2>강아지9</h2>
			        <p>Some description</p>
			    </article>
			</section>
		</main>
</div>
</body>
</html>