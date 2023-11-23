package com.seoul.fiding.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member")
public class MainController {
	// 메인 페이지로
	@GetMapping("/main")
	public String mainpage() {
		return "main/main";
	}
	

}
