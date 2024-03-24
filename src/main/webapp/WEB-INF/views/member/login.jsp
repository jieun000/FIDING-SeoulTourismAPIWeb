<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>로그인</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="/resources/css/main.css"> <!-- 스타일 파일 링크 추가 -->
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="/resources/images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/resources/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/resources/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/resources/fonts/iconic/css/material-design-iconic-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/resources/vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="/resources/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/resources/vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/resources/vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="/resources/vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/resources/css/util.css">
	<link rel="stylesheet" type="text/css" href="/resources/css/main.css">
<!--===============================================================================================-->
</head>
<body>
	
	<div class="limiter">
		<div class="container-login100" style="background-color: #DAE7F0;">
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
				<form class="login100-form validate-form" action="/trip/login" method="post">
					<span class="login100-form-title p-b-49">
						Seoul Trip
					</span>

					<div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100">아이디</span>
						<input class="input100" type="text" name="id" placeholder="아이디를 입력하세요">
						<span class="focus-input100" data-symbol="&#xf206;"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Password is required">
						<span class="label-input100">패스워드</span>
						<input class="input100" type="password" name="password" placeholder="패스워드를 입력하세요">
						<span class="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					
					<br>
					<br>
					
					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn">
								로그인
							</button>
						</div>
					</div>

					<div class="txt1 text-center p-t-54 p-b-20">
						<span>
							간편 로그인
						</span>
					</div>

					<!-- 카카오 로그인 연동 --> 
					<div class="flex-c-m">
						<ul>
							<li onclick="kakaoLogin();">
						      <a href="javascript:void(0)">
						          <img src="/resources/images/kakao_medium.png" alt="카카오 로그인">
						      </a>
							</li>
						</ul>
					<!-- 빈 요소를 추가하여 간격 생성 -->
  					<div style="width: 10px;"></div>
					<!-- 네이버 로그인 연동 -->	
						<ul>
							<li>
						      <!-- 아래와같이 아이디를 꼭 써준다. -->
						      <a id="naverIdLogin_loginButton" href="javascript:void(0)">
						          <span>
						            <!-- 네이버 로고 이미지 추가 -->
						            <img src="/resources/images/naver_medium.png" alt="네이버 로그인">
						        </span>
						      </a>
							</li>
						</ul>

					</div>

					<div class="flex-col-c p-t-50">
						<a href="signup" class="txt2">
							회원가입
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<div id="dropDownSelect1"></div>
	
<!--===============================================================================================-->
	<script src="/resources/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="/resources/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="/resources/vendor/bootstrap/js/popper.js"></script>
	<script src="/resources/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="/resources/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="/resources/vendor/daterangepicker/moment.min.js"></script>
	<script src="/resources/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="/resources/vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="/resources/js/main.js"></script>
	
	<!-- 카카오 스크립트 -->
	<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
	<script>
	Kakao.init('08bfe2f1b64cea0cb49c83f0c8780228'); //발급 받은 키 중 javascript키를 사용해준다.
	console.log('카카오 로그인 SDK 초기화 여부판단:',Kakao.isInitialized()); // sdk 초기화 여부 판단
	
	//카카오 로그인
	function kakaoLogin() {
	    Kakao.Auth.login({
	      success: function (response) {
	        Kakao.API.request({
	          url: '/v2/user/me',
	          success: function (response) {
	        	  //카카오 로그인 성공시 함수 코드 작성 부분
	        	  console.log(response)
	        	  var {email, profile} = response.kakao_account
	        	  var {nickname} = profile
	        	  var id = email.split('@')[0]
	        	  console.log(email, nickname)
				  
	        	  $("#socialLoginForm input").eq(0).val(id)
	        	  $("#socialLoginForm input").eq(2).val(nickname)
	        	  $("#socialLoginForm input").eq(5).val(email)
	        	  $('#tr').trigger('click');
	          },
	          fail: function (error) {
	            console.log(error)
	          },
	        })
	      },
	      fail: function (error) {
	        console.log(error)
	      },
	    })
	  }
	</script>
	
	<!-- 네이버 스크립트 -->
	<script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" charset="utf-8"></script>
	<script>
	var naverLogin = new naver.LoginWithNaverId(
			{
				clientId: "eWhMrerax5OL1_29UdAs", //내 애플리케이션 정보에 cliendId를 입력해줍니다.
				callbackUrl: "http://localhost:8080/trip/login", // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
				isPopup: false,
				callbackHandle: true
			}
		);	
	
	naverLogin.init();
	
	window.addEventListener('load', function () {
	    naverLogin.getLoginStatus(function (status) {

	        if (status) {
	            var email = naverLogin.user.getEmail();
	            var name = naverLogin.user.getName(); // 새로 추가된 부분
	            var id = email.split('@')[0];
	            console.log("네이버 로그인 성공");
	            console.log("이메일:", email);
	            console.log("이름:", name); // 새로 추가된 부분
	            

	            // 나머지 코드는 동일
	            $("#socialLoginForm input").eq(0).val(id);
	            $("#socialLoginForm input").eq(2).val(name);
	            $("#socialLoginForm input").eq(5).val(email);
	            $('#tr').trigger('click');

	            if (email == undefined || email == null) {
	                alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
	                naverLogin.reprompt();
	                return;
	            }
	        } else {
	            console.log("네이버 로그인 실패 또는 사용자가 로그인하지 않음");
	            // 여기에 더 자세한 실패 이유를 확인할 수 있는 코드 추가
	        }
	    });
	});
	</script>
	
	<script>
		$(document).ready(function(){
			$('#socialLoginForm').css("visibility", "hidden");
		})
	</script>
	<form action='/trip/socialLogin' method="POST" id="socialLoginForm">
		<input type='text' name='id'/>
		<input type='text' name='pw'/>
		<input type='text' name='username'/>
		<input type='text' name='nickname'/>
		<input type='text' name='phone'/>
		<input type='text' name='email'/>
		<input type='submit' id='tr'/>
	</form>
</body>
</html>