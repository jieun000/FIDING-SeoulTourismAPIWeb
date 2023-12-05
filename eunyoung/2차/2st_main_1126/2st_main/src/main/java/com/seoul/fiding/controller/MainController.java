package com.seoul.fiding.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/trip")
public class MainController {
	
	@GetMapping("/main")
	public String mainPage(HttpServletRequest request) {
		if(request.getSession()!=null) 		return "/main/main";
		else return "redirect:/member/login";
	}

	@PostMapping("/main")
	public String mainPage_post(HttpServletRequest request) {
		
		return "/main/main";
	}
	
}
