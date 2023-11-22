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
@RequestMapping("/member/*")
public class MemberController {

	
	@Setter(onMethod_=@Autowired)
	private MemberService service;
	
	@GetMapping("/register")
	public String a() {
		
		return "member/register";
	}
	
	@PostMapping("/register")
	public String register_post(MemberVO vo) {
		System.out.println(vo);
		service.register(vo);
		return "redirect:/";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Locale locale, Model model,String email , String nickname, String from) {
		System.out.println("email:"+ email +"nickname:" +nickname+"from:"+from);
		return "/login/login";
	}
}
