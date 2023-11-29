package com.seoul.fiding.service;

import java.util.List;

import com.seoul.fiding.vo.MemberVO;
import com.seoul.fiding.vo.SearchVO;
import com.seoul.fiding.vo.FavorVO;
import com.seoul.fiding.vo.TourVO;
import com.seoul.fiding.vo.BoardVO;
import com.seoul.fiding.vo.LikeVO;

public interface MemberService {
	public void register(MemberVO vo); //회원가입
	public MemberVO isSignup(String id); //멤버 정보 불러오기

	public void writeBoard(BoardVO vo); //게시물 저장
	public BoardVO selectOneBoard(int BD_NO); //게시물 하나 보여주기
	public List<BoardVO> selectBoardPaging9(SearchVO vo); //그냥 최근 보드 9개 가져오기
	public List<BoardVO> selectBoardByIdPaging9(SearchVO vo); //내 최근 보드 9개 가져오기
	public List<BoardVO> selectBoardBySearchPaging9(SearchVO vo); //검색된 최근 보드 9개 가져오기
	public List<BoardVO> selectBoardByCatPaging9(SearchVO vo); // 카테고리로 최근 보드 9개 가져오기
	public void updateBoard(BoardVO vo); //보드 수정
	public void likeUp(int BD_NO); //보드의 좋아요 증가
	public void likeDown(int BD_NO); //보드의 좋아요 감소
	public void deleteABoard(int BD_NO); //보드삭제
	public void deleteAllBoardByID(String id); //임시
	
	public void deleteAllByBDNO(int BD_NO); //보드 삭제시 같이 실행
	
	public void insertLike(LikeVO vo); //좋아요 객체 저장
	public void deleteALike(int LL_NO); //좋아요 객체 삭제
	
	public void insertFavor(FavorVO vo); //즐겨찾기 객체 저장
	public void deleteAFavor(int LL_NO); //즐겨찾기 객체 삭제
	
	public void insertTour(TourVO vo); //관광지 정보 등록
	public void searchUp(int TL_NO); //임시
	
	public int maxTour();

}
