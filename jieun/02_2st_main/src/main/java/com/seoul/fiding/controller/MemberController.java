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
	
	@GetMapping("/register")
	public String register_get() {
		
		return "member/register";
	}
	
	@PostMapping("/register")
	public String register_post(MemberVO vo) {
		System.out.println(vo);
		service.register(vo);
		return "redirect:/";
	}
	
	@GetMapping("/login1")
	public String login_get(String email , String nickname, String from, Model model) {
		System.out.println("email: "+ email +", nickname: " +nickname+" from: "+from);
		return "redirect:/";
	}
	
	@GetMapping("/login")
	public String login() {
		System.out.println("login jsp 를 열어라 ");
		return "/login/login";
	}
}
