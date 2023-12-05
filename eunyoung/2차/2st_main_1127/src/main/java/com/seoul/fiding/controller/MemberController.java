package com.seoul.fiding.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
		return "member/login";
	}

	
	// 로그인 페이지로
	@GetMapping("/login")
	public String login(HttpServletRequest request) {
		if(request.getSession()==session) {
			System.out.println("세션 같애, 메인페이지로 이동.");
			return "redirect:/trip/main";
		}
		return "member/login";
	}
	
	// 로그인 DB연동
		@PostMapping("/login")
		public String login_post(MemberVO vo, HttpServletRequest request, HttpServletResponse response, Model model) {
		    System.out.println(vo);
		    MemberVO tripUser = service.isSignup(vo.getId());
		    System.out.println(service.isSignup(vo.getId()));

		    if (tripUser == null) {
		        // 로그인 실패 시 경고창을 띄우는 JavaScript 코드를 응답에 추가
		        response.setContentType("text/html;charset=UTF-8");
		        try (PrintWriter out = response.getWriter()) {
		            out.println("<script>");
		            out.println("alert('로그인에 실패했습니다. 회원가입을 해주세요.');");
		            out.println("window.location.href='/trip/signup';");
		            out.println("</script>");
		        } catch (IOException e) {
		            // IOException 처리
		            e.printStackTrace();
		        }
		        return null; // 경고창을 띄웠으므로 다른 뷰로 이동할 필요가 없음
		    } else {
		        session = request.getSession();
		        session.setAttribute("seoulTripId", vo.getId());
		        System.out.println(session.getId());
		        session.setAttribute("tripUser", tripUser);
		        return "redirect:/trip/main";
		    }
		}
	// 소셜 로그인
	@PostMapping("/socialLogin")
	public String login_get(MemberVO vo, HttpServletRequest request) {
		System.out.println("소셜 id:"+vo.getId());
		if(service.isSignup(vo.getId())==null) service.register(vo);
		System.out.println("소셜 리스트:"+vo);
		MemberVO tripUser =service.isSignup(vo.getId());
		System.out.println(tripUser.getUsername());
		session = request.getSession();
		session.setAttribute("tripUser", tripUser);
		return "redirect:/trip/main";
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
	    	return "redirect:/trip/login";
	    }
	    return null;
		
	}

}
