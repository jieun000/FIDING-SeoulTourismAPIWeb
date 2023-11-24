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
	
	private HttpSession session;
	
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
		if(request.getSession()==session) {
			System.out.println("세션 같애, 메인페이지로 이동.");
			return "redirect:/mainControll/main";
		}
		return "member/login";
	}
	// 로그인 DB연동
	@PostMapping("/login")
	public String login_post(MemberVO vo, HttpServletRequest request, HttpServletResponse response) {
		System.out.println(vo);
		System.out.println(service.isSignup(vo.getId()));
		if(service.isSignup(vo.getId())==null){
			return "member/signup";
		}else {
			session = request.getSession();
			session.setAttribute("seoulTripId", vo.getId());
            System.out.println(session.getId());
            return "redirect:/mainControll/main";
		}
	}
	// 소셜 로그인
	@PostMapping("/socialLogin")
	public String login_get(MemberVO vo) {
		vo.setId(vo.getEmail().split("@")[0]);
		System.out.println(vo.getId());
		if(service.isSignup(vo.getEmail())==null) service.register(vo);
		System.out.println(vo);

		return "/main/main";
	}

	
	// 로그아웃
	@GetMapping("/logout")
	public String logout(MemberVO vo, HttpServletRequest request) throws InterruptedException {
		HttpSession session = request.getSession(false); // Session이 없으면 null return
	    if(session != null)  {
	    	System.out.println("Before invalidate: " + session.getId());
	    	session.invalidate();
	    	session = request.getSession(false);
	    	System.out.println("얏 지워졌나?: "+session);
	    	return "redirect:/member/login";
	    }
	    return null;
		
	}

}
