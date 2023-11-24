package com.seoul.fiding.controller;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
	public String login() {
		System.out.println("login jsp를 열어라 ");
		
		return "/member/login";
	}
	// 로그인 DB연동
	@PostMapping("/login")
	public String login_post(MemberVO vo) {
		System.out.println(vo);
		try {
			System.out.println(service.isSignup(vo.getId()));
			if(service.isSignup(vo.getId())==null){
				return "member/signup";
			}else {
				System.out.println(vo);
				return "/main/main";
			}
		} catch (Exception e) {
			return "member/signup";	
		}
	}
	
	// 소셜 로그인
	@PostMapping("/socialLogin")
	public String login_get(MemberVO vo) {
		if(service.isSignup(vo.getId())==null) {
			service.register(vo);
		};
		System.out.println(vo);

		return "/main/main";
	}

}
