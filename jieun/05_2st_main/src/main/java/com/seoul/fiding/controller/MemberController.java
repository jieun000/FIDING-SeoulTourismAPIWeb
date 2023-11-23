package com.seoul.fiding.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.seoul.fiding.service.MemberService;
import com.seoul.fiding.vo.MemberVO;

import lombok.Setter;

@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Setter(onMethod_=@Autowired)
	private MemberService service;
	
	// 회원가입 페이지로
	@GetMapping("/signup")
	public String register_get() {
		
		return "member/signup";
	}
	
	// 회원가입 DB연동
	@PostMapping("/signup")
	public String register_post(MemberVO vo) {
		System.out.println(vo);
		service.register(vo);
		
		return "redirect:/";
	}
	
	// 로그인 페이지로
	@GetMapping("/login")
	public String login(HttpServletRequest request) {
		System.out.println("login jsp를 열어라 ");
		HttpSession session = request.getSession(false);
	    if(session != null) return "main/main";
		return "/member/login";
	}
	// 로그인 DB연동
	@PostMapping("/login")
	public String login_post(MemberVO vo, HttpServletRequest request, HttpServletResponse response ) {
		System.out.println(vo);
		try {
			System.out.println(service.isSignup(vo.getId()));
			if(service.isSignup(vo.getId())==null){
				return "member/signup";
			}else {
				System.out.println(vo);
				HttpSession session = request.getSession(false);
	            session.setAttribute("id", vo.getId());
	            System.out.println(session.getId());
	            return "/main/main";
			}
		} catch (Exception e) {
			return "member/signup";
		}
	}
	
	// 소셜 로그인
	@PostMapping("/socialLogin")
	public String login_get(MemberVO vo) {
		if(service.isSignup(vo.getId())==null) service.register(vo);
		System.out.println(vo);

		return "/main/main";
	}

	// 로그아웃
	@GetMapping("/logout")
	public String logout(MemberVO vo, HttpServletRequest request) {
		HttpSession session = request.getSession(false);
	    if(session != null)  {
	    	System.out.println("Before invalidate: " + session.getId());
	    	session.invalidate();
	    	System.out.println("After invalidate: " + session.getId());
	    	System.out.println("사랑");
//	    	System.out.println(session.getId());
	    	return "redirect:/member/login";
	    }
	    
		return "/member/login";
		//<form action="/member/logout">
		//<input type="text" value=""/>
		//<input type="submit" value="로그아웃"/>
		//</form>
		//<script>
		//console.log('<%= session.getId() %>');
		//</script>
	}

}
