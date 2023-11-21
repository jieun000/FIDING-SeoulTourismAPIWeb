package com.seoul.fiding.controller;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/member")
public class MainController {
	
	@GetMapping("/register")
	public String a(String email , String nickname, String from) {
		System.out.println("email:"+ email +"nickname:" +nickname+"from:"+from);
		return "redirect:/";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Locale locale, Model model) {
		
		return "/login/login";
	}

}
