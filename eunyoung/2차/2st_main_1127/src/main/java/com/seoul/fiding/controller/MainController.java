package com.seoul.fiding.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
		else return "redirect:/trip/login";
	}

	@PostMapping("/main")
	public String mainPage_post(HttpServletRequest request) {
		
		return "/main/main";
	}
	
	//메인페이지에서 검색하면 넘어가는 페이지
	@GetMapping("/apiSearch")
	public String apiSearch_get() {
		
		return "/main/apiSearch";
	}
	
	//메인페이지에서 검색하면 넘어가는 페이지
		@PostMapping("/apiSearch")
		public String apiSearch_get(String selectedValue, String searchValue, Model model ) {
			System.out.println(searchValue);
			model.addAttribute("searchValue", searchValue);
			model.addAttribute("selectValue", selectedValue);
			return "/main/apiSearch";
		}
}
