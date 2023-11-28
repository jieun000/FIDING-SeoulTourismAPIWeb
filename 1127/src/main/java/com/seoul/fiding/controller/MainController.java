package com.seoul.fiding.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.seoul.fiding.service.MemberService;
import com.seoul.fiding.vo.MemberVO;

import lombok.Setter;	

@Controller
@RequestMapping("/trip")
public class MainController {
	
	@Setter(onMethod_=@Autowired)
	private MemberService service;
	
	@GetMapping("/main")
	public String mainPage(MemberVO vo, HttpServletRequest request) {
		if(request.getSession()!=null) {
			return "/main/main";
		}	
		else return "redirect:/member/login";
		
	}

	@PostMapping("/main")
	public String mainPage_post(HttpServletRequest request) {
		
		return "/main/main";
	}
	
}
