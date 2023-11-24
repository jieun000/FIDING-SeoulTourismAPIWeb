<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>Seoul Trip</title>
	<link rel="stylesheet" type="text/css" href='/resources/css/header.css' />
	<link rel="stylesheet" type="text/css" href='/resources/css/box.css' />
	<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

</head>
<body>
     <header>
        <h1>Seoul Trip 🚩</h1>
         <div class="wrapper">
		    <div class="search_box">
		        <div class="dropdown">
		            <select class="select-box">
		                <option value="" disabled selected>카테고리</option>
		                <option value="자연">자연</option>
		                <option value="역사">역사</option>
		                <option value="관광">관광</option>
		                <option value="축제">축제</option>
		                <option value="음식">음식</option>
		            </select>
		        </div>
		        <div class="search_field">
		            <input type="text" class="input" placeholder="검색어를 입력하세요">
		            <i class="fas fa-search"></i>
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
    
    <!-- 구분 선 -->
    <div class="line"></div>
	</nav>