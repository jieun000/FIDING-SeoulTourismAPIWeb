<%@page import="com.seoul.fiding.vo.MemberVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<% MemberVO tripUser = (MemberVO)session.getAttribute("tripUser"); %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Seoul Trip</title>
	<link rel="stylesheet" type="text/css" href='/resources/css/header.css'/>
	<link rel="stylesheet" type="text/css" href='/resources/css/box.css'/>
	<link rel="stylesheet" type="text/css" href='/resources/css/boardPage.css'/>
	<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=313fdeecf494c5472cedd60c6cd977c8"></script>
</head>
<body>
     <header>
        <div id="home_container">
        	<h1 style="cursor: pointer;" onclick="redirectToMain()">Seoul Trip 🚩</h1>
    	</div>
        <div class="wrapper">
			<div class="search_box">
		        <div class="dropdown">
		            <select id="categorySelect" class="select-box">
		                <option value="A01">자연</option>
		                <option value="A02&A0201">역사</option>
		                <option value="A02&A0202" disabled selected>관광</option>
		                <option value="A02&A0207">축제</option>
		                <option value="A05">음식</option>
		            </select>
		        </div>
		        <div class="search_field">
		            <input id="searchInput" type="text" class="input" value="" placeholder="검색어를 입력하세요">
		            <i id="searchIcon" class="fas fa-search"></i>
		        </div>
		    </div>
		</div>
    </header>
    <!-- 네비게이션 메뉴바 -->
    <nav>
	    <div class="menu-bar">
	        <!-- 메뉴바 내용 -->
	        <div class="my-box">
	        	<ul>
	        		<div class="image-profile">
    					<img id="profileImage" src="/resources/images/1등급.png" alt="프로필 이미지">
					</div>
	        		<li>이름 : <c:out value="${tripUser.username}"/></li>
	        		<li>닉네임 : ${tripUser.nickname}</li>
	        		<li>작성한 게시물 수 : ${tripUser.write_cnt}</li>
	        	</ul>
	        </div>
        	<div class="menu-list">
	           	<ul>
                	<li id="myPost" style="cursor: pointer;">💗 내 게시물</li>
   					<li id="bookmark" style="cursor: pointer;">💛 즐겨찾기</li>
					<li id="boardmenu" style="cursor: pointer;">💚 게시판</li>
					<li id="restaurant" style="cursor: pointer;">💙 맛집 목록</li>
					<li id="history" style="cursor: pointer;">💜 유적지 목록</li>
             	</ul>
     		</div>
	     		<div class="parent-container">
				  <form action='/trip/logout'>
				    <input type='submit' value='logout'>
				  </form>
			</div>
	    </div>
	 
	    <!-- 구분 선 -->
	    <div class="line"></div>
	</nav>
	<script>
   // 각 메뉴 클릭 시 호출될 함수
	function handleMenuClick(menuId) {
		switch (menuId) {
			case 'myPost':
			   window.location.href= '/trip/mypost';
			   break;
			case 'bookmark':
			   window.location.href= '/trip/bookmark';
			   break;
			case 'boardmenu':
			   window.location.href= '/trip/boardmenu';
			   break;
			case 'restaurant':
			   window.location.href= '/trip/restaurant';
			   break;
			case 'history':
			   window.location.href= '/trip/history';
			   break;
			default:
			   break;
		}
	}

   // 각 메뉴에 대한 클릭 이벤트 리스너 등록
   document.getElementById('myPost').addEventListener('click', function () {
      handleMenuClick('myPost');
   });
   document.getElementById('bookmark').addEventListener('click', function () {
      handleMenuClick('bookmark');
   });
   document.getElementById('boardmenu').addEventListener('click', function () {
      handleMenuClick('boardmenu');
   });
   document.getElementById('restaurant').addEventListener('click', function () {
      handleMenuClick('restaurant');
   });
   document.getElementById('history').addEventListener('click', function () {
      handleMenuClick('history');
   });
</script>
	
