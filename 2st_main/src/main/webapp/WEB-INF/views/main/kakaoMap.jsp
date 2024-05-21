<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp"%>

	여기는 main 페이지 <br>
	게시판이 있어요
	<div id="map" style="width:500px;height:400px;"></div>	
	
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=kakao_map_key"></script>
<script type="text/javascript">
	var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
	var options = { //지도를 생성할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
		level: 3 //지도의 레벨(확대, 축소 정도)
	};

	var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
</script>
</body>
</html>