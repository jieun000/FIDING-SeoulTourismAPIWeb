package com.seoul.fiding.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
import com.seoul.fiding.vo.FavorVO;
import com.seoul.fiding.vo.LikeVO;
import com.seoul.fiding.vo.MemberVO;
import com.seoul.fiding.vo.SearchVO;
import com.seoul.fiding.vo.TourVO;

import lombok.Setter;	

@Controller
@RequestMapping("/trip")
public class MainController {
	
	private HttpSession session;
	
	private void page(SearchVO vo){
		vo.setPage_num((vo.getPage_num()-1)*9);
	}
	
	static Map<String,String> catmap = new HashMap<String, String>();
	
	private String catTranse(String s) {
		catmap.put("A01", "자연");
		catmap.put("A02&A0201", "역사");
		catmap.put("A02&A0202", "관광");
		catmap.put("A02&A0207", "축제");
		catmap.put("A05", "음식");
		String result = catmap.get(s);
		return result;
	}
	
	@Setter(onMethod_=@Autowired)
	private MemberService service;
	
	@GetMapping("/main")
	public String mainPage(MemberVO vo, HttpServletRequest request) {
		System.out.println("메인 페이지 get 컨트롤러");
		if(request.getSession()!=null) {
			return "/main/main";
		}	
		else return "redirect:/trip/login";
	}
	@PostMapping("/main")
	public String mainPage_post(HttpServletRequest request) {
		System.out.println("메인 페이지 post 컨트롤러");
		return "/main/main";
	} 
		
//	@RequestMapping("/likeTop")
//	public String likeTopPage(BoardVO vo, Model model,HttpServletRequest request) {
//		if(request.getSession()!=null) {
//			List<BoardVO> toplike = service.selectToplike();
//			System.out.println("좋아요 컨트롤러"+toplike.get(0));
//			model.addAttribute("Toplike",toplike.get(0));
//			return "/main/main";
//		}	
//		else return "redirect:/trip/login";
//	}

	// 메인페이지에서 검색하면 넘어가는 페이지
	@GetMapping("/apiSearch")
	public String apiSearch_get() {
		System.out.println("api 검색 get 컨트롤러");
		return "/main/apiSearch";
	}
	//메인페이지에서 검색하면 넘어가는 페이지
	@PostMapping("/apiSearch")
	public String apiSearch_get(String selectedValue, String searchValue, Model model ) {
		System.out.println("api 검색 post 컨트롤러");
		System.out.println(searchValue);
		model.addAttribute("searchValue", searchValue);
		model.addAttribute("selectValue", selectedValue);
		return "/main/apiSearch";
	}
	
	// 게시물창으로
	@GetMapping("/boardSearch")
	public String boardSearch(int bno, Model model) {
		// System.out.println(bno);
		BoardVO vo = service.selectOneBoard(bno);
		model.addAttribute("boardVO", vo);
		return "/main/boardPage";
	}
	@PostMapping("/boardSearch2")
	@ResponseBody
	public ResponseEntity<List<BoardVO>> boardSearch2(@RequestBody SearchVO vo) {
		System.out.println("컨트롤러야 드렁롸아 "+vo);
		List<BoardVO> list = null;
		page(vo);
		vo.setCat(catTranse(vo.getCat()));
		vo.setSearch("%"+vo.getSearch()+"%");
		try {
			list = service.selectBoardBySearchPaging9(vo);
			list.forEach(i->System.out.println(i));
		} catch(Exception e) {
			System.out.println("검색어 입력 없어요");
			return new ResponseEntity<List<BoardVO>> (list, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		return new ResponseEntity<List<BoardVO>> (list, HttpStatus.OK);
	}
	
	@PostMapping("/boardmain")
	@ResponseBody
	public ResponseEntity<List<BoardVO>> boardmain(@RequestBody SearchVO vo) {
		System.out.println("컨트롤러야 드렁롸아 "+vo);
		List<BoardVO> list = null;
		page(vo);
		vo.setCat(catTranse(vo.getCat()));
		vo.setSearch("%"+vo.getSearch()+"%");
		try {
			list = service.selectBoardBySearchPaging9(vo);
			list.forEach(i->System.out.println(i));
		}
		catch(Exception e) {
			System.out.println("검색어 입력 없어요");
			return new ResponseEntity<List<BoardVO>> (list, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		return new ResponseEntity<List<BoardVO>> (list, HttpStatus.OK);
	}
	
	@PostMapping("/boardSearch")
	public BoardVO boardSearch_post(int bno) {
		BoardVO vo = service.selectOneBoard(bno);
		return vo;
	}
	
	@GetMapping("/boardPage")
	public String boardPage(int BD_NO, Model model, HttpServletRequest request) {
		session = request.getSession();
		MemberVO mvo = (MemberVO)session.getAttribute("tripUser");
		System.out.println(mvo.getId());
	    BoardVO vo = service.selectOneBoard(BD_NO,mvo.getId());
	    System.out.println("게시물 번호" + vo + "페이지가 보여지고 있어요");
	    model.addAttribute("boardVO",vo);
	    return "/main/boardPage";
	}

	// 내 게시물로 이동하는 페이지
	@GetMapping("/mypost")
	public String mypost_get(Model model) {
		System.out.println("내 게시물 get 컨트롤러");
		BoardVO vo = service.selectOneBoard(1);
		model.addAttribute("boardVO", vo);
		//service.selectBoardByCatPaging9()
		return "/main/mypost";
	}
	@PostMapping("/mypost")
	@ResponseBody
	public ResponseEntity<List<BoardVO>> mypost_post(@RequestBody SearchVO vo, HttpServletRequest request) {
		System.out.println("내 게시물 post 컨트롤러: " + vo);
		List<BoardVO> list = null;
		page(vo);
		try {
			list = service.selectBoardByIdPaging9(vo);
			list.forEach(i-> i.setLength(service.selectBoardByIdPaging9l(vo)));
			list.forEach(i-> System.out.println(i));
			System.out.println(list);
		}
		catch(Exception e) {
			System.out.println("검색어 입력 없어요");
			return new ResponseEntity<List<BoardVO>> (list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<BoardVO>> (list, HttpStatus.OK);
	}
	
	// 즐겨찾기 게시판으로 이동하는 페이지
	@GetMapping("/favorPost")
	public String favorPost(Model model) {
		System.out.println("즐겨찾기 게시판 get 컨트롤러");
		//service.selectBoardByCatPaging9()
		return "/main/favorpost";
	}
	@PostMapping("/favorPost")
	@ResponseBody
	public ResponseEntity<List<BoardVO>> favorPost(@RequestBody SearchVO vo, HttpServletRequest request) {
		System.out.println("즐겨찾기 게시판 post 컨트롤러: " + vo);
		List<BoardVO> list = null;
		page(vo);
		
		list = service.selectBoardByFavorPaging9(vo);
		// list.forEach(i->System.out.println(i));
		list.forEach(i-> i.setLength(service.selectBoardByFavorPaging9l(vo)));
		System.out.println(list);
		return new ResponseEntity<List<BoardVO>> (list, HttpStatus.OK);
	}
	@GetMapping("/favorUp")
	@ResponseBody
	public ResponseEntity<String> favorUp( FavorVO vo ) {
       System.out.println("즐겨찾기 추가 컨트롤러: " + vo+":");
       service.insertFavor(vo);
       return ResponseEntity.ok("Success");
   }
   @GetMapping("/favorDown")
   @ResponseBody
   public ResponseEntity<String> favorDown( FavorVO vo ) {
	   System.out.println("즐겨찾기 삭제 컨트롤러: " + vo+":");
       service.deleteAFavor(vo);
       return ResponseEntity.ok("Success");
   }
   // 좋아요 게시판
   @GetMapping("/likeUp")
   @ResponseBody
   public ResponseEntity<String> likeUp( LikeVO vo ) {
	   System.out.println("좋아요 추가 컨트롤러: " + vo+":");
       service.insertLike(vo);
       service.likeUp(vo.getBD_NO());
       return ResponseEntity.ok("Success");
   }
   @GetMapping("/likeDown")
   @ResponseBody
   public ResponseEntity<String> likeDown( LikeVO vo ) {
	   System.out.println("좋아요 삭제 컨트롤러: " + vo+":");
       service.deleteALike(vo);
       service.likeDown(vo.getBD_NO());
       return ResponseEntity.ok("Success");
   }
	
	// 즐겨찾기 이동하는 페이지
	@GetMapping("/bookmark")
	public String bookmark_get() {
		System.out.println("즐겨찾기 이동 get 컨트롤러");
		return "/main/bookmark";
	}
	// 게시판 이동하는 페이지
	@GetMapping("/boardmenu")
	public String boardmenu_get() {
		System.out.println("게시판 이동 get 컨트롤러");
		return "/main/boardmenu";
	}
	// 맛집 목록 이동하는 페이지
	@GetMapping("/restaurant")
	public String restaurant_get() {
		System.out.println("맛집 목록 이동 get 컨트롤러");
		return "/main/restaurant";
	}
	//유적지 목록 이동하는 페이지
	@GetMapping("/history")
	public String history_get() {
		System.out.println("유적지 목록 이동 get 컨트롤러");
		return "/main/history";
	}
	
	// 아작스로 보드하나 불러오는 것
	@PostMapping("/search_one_board")
	@ResponseBody
	public ResponseEntity<BoardVO> one_board(@RequestBody int bno) {
		System.out.println("bno: "+bno);
		BoardVO bvo = null;
		try {
			bvo = service.selectOneBoard(bno);
		} catch(Exception e) {
			System.out.println("검색어 입력 없어요");
			return new ResponseEntity<BoardVO> (bvo, HttpStatus.INTERNAL_SERVER_ERROR);
		}
      return new ResponseEntity<BoardVO> (bvo, HttpStatus.OK);
   }
	
	@PostMapping("/boardAll")
	@ResponseBody
	public ResponseEntity<List<BoardVO>> boardAll(@RequestBody SearchVO vo) {
		System.out.println("컨트롤러야 드렁롸아 "+vo);
		List<BoardVO> list = null;
		page(vo);
		try {
			list = service.selectBoardPaging9(vo);
			list.forEach(i-> i.setLength(service.selectBoardPaging9l(vo)));
			list.forEach(i->System.out.println(i));
		} catch(Exception e) {
			System.out.println("검색어 입력 없어요");
			return new ResponseEntity<List<BoardVO>> (list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<BoardVO>> (list, HttpStatus.OK);
	}
	
	@PostMapping("/boardAll2")
	@ResponseBody
	public ResponseEntity<List<BoardVO>> boardAll2(@RequestBody SearchVO vo) {
	    System.out.println("좋아요 컨트롤러: " + vo);
	    List<BoardVO> list = null;
	    vo.setPage_num((vo.getPage_num()-1)*6);
	    try {
	        // 여기서 좋아요 수에 따라 정렬된 결과를 가져오도록 서비스 메서드 수정
	        list = service.selectToplike(vo);
	        list.forEach(i -> i.setLength(service.selectBoardPaging9l(vo)));
	        list.forEach(i -> System.out.println(i));
	    } catch (Exception e) {
	        System.out.println("좋아요 데이터 없어요");
	        return new ResponseEntity<>(list, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	    return new ResponseEntity<>(list, HttpStatus.OK);
	}

	
	// 관광지 추가
	@PostMapping("/insertTour")
	@ResponseBody
	public ResponseEntity<String> insertTour(@RequestBody TourVO vo) {
		System.out.println("관광지 추가 컨트롤러: " + vo);
		service.insertTour(vo);
		int TL_NO = service.maxTour();
		return new ResponseEntity<String>(TL_NO + "" ,HttpStatus.OK); 
	}

	// 게시물 작성페이지로 이동
	@GetMapping("/writeBoard")
	public String writeBoard(int TL_NO, Model model) {
		System.out.println("게시물 작성 get 컨트롤러, 게시물 작성 할 관광지 번호: " + TL_NO);
		TourVO vo = service.selectOneTour(TL_NO);
		model.addAttribute("TourVO", vo);
		return "/main/boardWrite";
	}
	@PostMapping("/writeBoard")
	public String writeBoard_post(BoardVO vo) {
		System.out.println("게시물 작성 post 컨트롤러: " + vo);
		service.writeBoard(vo);
		return "redirect:/trip/mypost";
	}   
	
	// 게시판 수정
	@GetMapping("/boardUpdate")
	public String boardUpdateGet(int BD_NO, Model model) {
		BoardVO vo = service.selectOneBoard(BD_NO);
		System.out.println("게시판 수정 get 컨트롤러: " + vo);
		model.addAttribute("boardVO",vo);
		return "/main/boardUpdate"; // 데이터 조회하여 데이터  boardUpdate.jsp 에 출력 
	}
	@PostMapping("/boardUpdate")
	public String boardUpdatePost(BoardVO vo, Model model) {
		 System.out.println("게시판 수정 post 컨트롤러: " + vo);
		 service.updateBoard(vo);
		 return "redirect:/trip/boardPage?BD_NO="+vo.getBD_NO();
	}
	
	// 게시판 삭제
	@GetMapping("/boardDelete")
	public String boardDelete_post(int bno) {
		System.out.println("게시물 삭제 컨트롤러, 삭제할 게시글 번호:" + bno);
		int no = service.deleteABoard(bno);
		System.out.println(bno+"가 " + no +"삭제되었어요");
		//삭제 후 돌아가는 url
		return "redirect:/trip/mypost";
	}
	
}
