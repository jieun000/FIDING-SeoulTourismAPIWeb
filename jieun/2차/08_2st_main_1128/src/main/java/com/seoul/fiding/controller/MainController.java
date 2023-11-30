package com.seoul.fiding.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.seoul.fiding.service.MemberService;
import com.seoul.fiding.vo.BoardVO;
import com.seoul.fiding.vo.MemberVO;
import com.seoul.fiding.vo.SearchVO;

import lombok.Setter;	

@Controller
@RequestMapping("/trip")
public class MainController {
	
	private void page(SearchVO vo){
		vo.setPage_num((vo.getPage_num()-1)*9);
	}
		
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
		
	@GetMapping("/boardUpdate")
	public String boardUpdate(MemberVO vo, HttpServletRequest request) {
		return "/main/boardUpdate";
	}
	
	//게시물창으로
	@GetMapping("/boardSearch")
	public String boardSearch(int bno, Model model) {
		// System.out.println(bno);
		BoardVO vo = service.selectOneBoard(bno);
		model.addAttribute("boardVO", vo);
		return "/main/boardPage";
	}
	@PostMapping("/boardSearch")
	public BoardVO boardSearch_post(int bno) {
		BoardVO vo = service.selectOneBoard(bno);
		return vo;
	}
	

	//내 게시물 이동하는 페이지
	@GetMapping("/mypost")
	public String mypost_get() {
		System.out.println("여기는 mypost");
		return "/main/mypost";
	}
	@PostMapping("/mypost")
	@ResponseBody
	public ResponseEntity<List<BoardVO>> mypost_post(@RequestBody SearchVO vo) {
		System.out.println("컨트롤러야 드렁롸아 "+vo);
		List<BoardVO> list =null;
		page(vo);
		try {
			list = service.selectBoardByIdPaging9(vo);
			list.forEach(i->System.out.println(i));
		}
		catch(Exception e) {
			System.out.println("검색어 입력 없어요");
			return new ResponseEntity<List<BoardVO>> (list, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		for(int i =1;i<10;i++) {
			BoardVO vo2= new BoardVO();
			vo2.setTitle("title:" +i);
			list.add(vo2);
		}
		return new ResponseEntity<List<BoardVO>> (list, HttpStatus.OK);
	}
	
	//즐겨찾기 이동하는 페이지
	@GetMapping("/bookmark")
	public String bookmark_get() {
		
		return "/main/bookmark";
	}
	
	//게시판 이동하는 페이지
	@GetMapping("/boardmenu")
	public String boardmenu_get() {
		
		return "/main/boardmenu";
	}
	
	//맛집 목록 이동하는 페이지
	@GetMapping("/restaurant")
	public String restaurant_get() {
		
		return "/main/restaurant";
	}
	
	//유적지 목록 이동하는 페이지
	@GetMapping("/history")
	public String history_get() {
		
		return "/main/history";
	}

}
