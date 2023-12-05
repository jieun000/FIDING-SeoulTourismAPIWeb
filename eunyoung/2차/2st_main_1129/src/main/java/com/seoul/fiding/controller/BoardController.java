//package com.seoul.fiding.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.servlet.mvc.support.RedirectAttributes;
//
//import com.seoul.fiding.service.MemberService;
//import com.seoul.fiding.vo.BoardVO;
//import com.seoul.fiding.vo.FavorVO;
//import com.seoul.fiding.vo.LikeVO;
//import com.seoul.fiding.vo.SearchVO;
//import com.seoul.fiding.vo.TourVO;
//
//import lombok.Setter;
//
//@Controller
//@RequestMapping("/trip")
//public class BoardController {
//	
//	@Setter(onMethod_=@Autowired)
//	private MemberService service;
//	
//	// 종아요 +1 
//	@GetMapping("/likeUp")
//	public void likeUp(int BD_NO) {
//		service.likeUp(BD_NO);
//	}
//	// 종아요 -1 
//	@GetMapping("/likeDown")
//	public void likeDown(int BD_NO) {
//		service.likeDown(BD_NO);
//	}
//	
//	// 게시물 작성페이지로
//	@GetMapping("/writeBoard")
//	public String writeBoard(BoardVO vo) {
//		return "";
//	}
//	@PostMapping("/writeBoard")
//	public void writeBoard_post(BoardVO vo) {
//		service.writeBoard(vo);
//	}	
//	
//	@GetMapping("/selectOneBoard")
//	public String selectOneBoard(int BD_NO, RedirectAttributes rttr) {
//		BoardVO list = service.selectOneBoard(BD_NO);
//		rttr.addFlashAttribute(list);
//		return "main/main";
//	}
//	
////	@GetMapping("/selectBoardPaging9")
////	public void selectBoardPaging9(int page_num) {
////		service.selectBoardPaging9(page_num);
////	}
//	@GetMapping("/selectBoardByIdPaging9")
//	public void selectBoardByIdPaging9(SearchVO vo) {
//		service.selectBoardByIdPaging9(vo);
//	}	
//	@GetMapping("/selectBoardBySearchPaging9")
//	public void selectBoardBySearchPaging9(SearchVO vo) {
//		service.selectBoardBySearchPaging9(vo);
//	}	
//	@GetMapping("/selectBoardByCatPaging9")
//	public void selectBoardByCatPaging9(SearchVO vo) {
//		service.selectBoardByCatPaging9(vo);
//	}
//	@GetMapping("/updateBoard")
//	public String updateBoard(BoardVO vo) {
//		return "main/boardUpdate";
//	}	
//	@PostMapping("/updateBoard")
//	public String updateBoard_post(BoardVO vo) {
//		service.updateBoard(vo);
//		return "main/main";
//	}	
//	
//	// 종아요 테이블에 기록
//	@GetMapping("/insertLike")
//	public void insertLike(LikeVO vo) {
//		service.insertLike(vo);
//	}
////	// 좋아요 테이블의 모든 열 보기
////	@GetMapping("/selectAllLike")
////	public String selectAllLike(RedirectAttributes rttr) {
////		LikeVO list = (LikeVO) service.selectAllLike();
////		rttr.addFlashAttribute(list);
////		return "main/main";
////	}
////	
////	// 좋아요 테이블에서 좋아요테이블번호로 1열 삭제
////	@GetMapping("/deleteALike")
////	public void deleteALike(int LL_NO) {
////		service.deleteALike(LL_NO);
////	}
////	
////	// 좋아요 테이블에서 게시판번호로 1열 삭제
////	@GetMapping("/deleteAllLikeByBNNO")
////	public void deleteAllLikeByBNNO(int BN_NO) {
////		service.deleteAllLikeByBNNO(BN_NO);
////	}
//	// 즐겨찾기 테이블에 기록
//	@GetMapping("/insertFavor")
//	public void insertFavor(FavorVO vo) {
//		service.insertFavor(vo);
//	}
//	// 즐겨찾기 테이블에서 즐겨찾기번호로 1열 삭제
//	@GetMapping("/deleteAFavor")
//	public void deleteAFavor(int LL_NO) {
//		service.deleteAFavor(LL_NO);
//	}
//	// 즐겨찾기 테이블에서 게시판번호로 1열 삭제
////	@GetMapping("/deleteAllFavorByBNNO")
////	public void deleteAllFavorByBNNO(int BN_NO) {
////		service.deleteAllFavorByBNNO(BN_NO);
////	}
//	
//	// 관광지 추가
//	@GetMapping("/insertTour")
//	public String insertTour(TourVO vo) {
//		service.insertTour(vo);
//		return "redirect:/trip/main"; 
//	}
//
//	// 관광지 검색
//	@GetMapping("/selectAllTour")
//	public String selectAllTour() {
//		service.selectAllTour(); 
//		return "main/Tour";
//	}
//	
//	// 관광지 수정 페이지로
//	@GetMapping("/searchUp")
//	public String searchUp_get() {
//		return "main/main";
//	}
//	// 관광지 수정
//	@PostMapping("/searchUp")
//	public String searchUp_post(int TL_NO) {
//		service.searchUp(TL_NO);
//		return "redirect:/trip/main";
//	}
//	
//}
