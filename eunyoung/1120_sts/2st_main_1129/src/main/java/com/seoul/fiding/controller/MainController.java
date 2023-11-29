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
import com.seoul.fiding.vo.Board;
import com.seoul.fiding.vo.BoardVO;
import com.seoul.fiding.vo.MemberVO;
import com.seoul.fiding.vo.SearchVO;

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
		
	@GetMapping("/boardUpdate")
	public String boardUpdateGet(int BD_NO, Model model) {
		
		BoardVO vo = service.selectOneBoard(BD_NO);
		System.out.println("컨트롤러서 수정  get"+vo);
		model.addAttribute("boardVO",vo);
		return "/main/boardUpdate"; // 데이터 조회하여 데이터  boardUpdate.jsp 에 출력 
	}
	@PostMapping("/boardUpdate")
	public String boardUpdatePost(BoardVO vo, Model model) {
		 System.out.println(vo);
		 service.updateBoard(vo);
		 System.out.println("여기에서 수정을 하는 컨트롤러 들어옴");
		 return "redirect:/trip/boardPage?BD_NO="+vo.getBD_NO();
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
	
	@GetMapping("/boardDelete")
	public String boardDelete_post(int bno) {
		System.out.println("게시글 번호:" +bno);
		int no= service.deleteABoard(bno);
		System.out.println(bno+"가 " +no +"삭제되었어요");
		//return "redirect:/trip/pageUpdate";
		return null;
	}
	
	@GetMapping("/boardPage")
	public String boardPage(int BD_NO, Model model) {
	    BoardVO vo = service.selectOneBoard(BD_NO);
	    System.out.println("게시물 번호" + vo + "페이지가 보여지고 있어요");
	    model.addAttribute("boardVO",vo);
	    return "/main/boardPage";
	}

	

	//내 게시물 이동하는 페이지
	@GetMapping("/mypost")
	public String mypost_get(Model model) {
		System.out.println("여기는 mypost");
		BoardVO vo = service.selectOneBoard(1);
		model.addAttribute("boardVO", vo);
		//service.selectBoardByCatPaging9()
		return "/main/mypost";
	}
	@PostMapping("/mypost")
	@ResponseBody
	public ResponseEntity<List<BoardVO>> mypost_post(@RequestBody SearchVO vo, HttpServletRequest request) {
		
		System.out.println("컨트롤러야 드렁롸아 "+vo);
		List<BoardVO> list =null;
		//page(vo);
		vo.setPage_num(0);
		try {
			list = service.selectBoardByIdPaging9(vo);
			list.forEach(i->System.out.println(i));
			System.out.println(list);
		}
		catch(Exception e) {
			System.out.println("검색어 입력 없어요");
			return new ResponseEntity<List<BoardVO>> (list, HttpStatus.INTERNAL_SERVER_ERROR);
			
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
	
	//아작스로 보드하나 불러오는 것
	@PostMapping("/search_one_board")
	   @ResponseBody
	   public ResponseEntity<BoardVO> one_board(@RequestBody int bno) {
	      System.out.println("bno: "+bno);
	      BoardVO bvo =null;
	      try {
	         bvo = service.selectOneBoard(bno);
	      }
	      catch(Exception e) {
	         System.out.println("검색어 입력 없어요");
	         return new ResponseEntity<BoardVO> (bvo, HttpStatus.INTERNAL_SERVER_ERROR);
	         
	      }
	      
	      return new ResponseEntity<BoardVO> (bvo, HttpStatus.OK);
	   }

}
