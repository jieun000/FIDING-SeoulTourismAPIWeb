package com.seoul.fiding.service;

import java.util.List;

import com.seoul.fiding.vo.MemberVO;
import com.seoul.fiding.vo.SearchVO;
import com.seoul.fiding.vo.FavorVO;
import com.seoul.fiding.vo.TourVO;
import com.seoul.fiding.vo.BoardVO;
import com.seoul.fiding.vo.LikeVO;

public interface MemberService {
	public void register(MemberVO vo);
	public MemberVO isSignup(String id);

	public void writeBoard(BoardVO vo);
	public MemberVO selectOneBoard(int BD_NO);
	public List<MemberVO> selectBoardPaging9(int page_num);
	public List<MemberVO> selectBoardByIdPaging9(int id,int page_num);
	public List<MemberVO> selectBoardBySearchPaging9(SearchVO vo);
	public void updateBoard(BoardVO vo);
	public void likeUp(int BD_NO);
	public void likeDown(int BD_NO);
	public void deleteABoard(int BD_NO);
	public void deleteAllBoardByID(String id);
	
	public void insertLike(LikeVO vo);
	public List<LikeVO> selectAllLike();
	public void deleteALike(int LL_NO);
	public void deleteAllLikeByBNNO(int BN_NO);
	
	public void insertFavor(FavorVO vo);
	public List<FavorVO> selectAllFavor();
	public void deleteAFavor(int LL_NO);
	public void deleteAllFavorByBNNO(int BN_NO);
	
	public void insertTour(TourVO vo);
	public List<TourVO> selectAllTour();
	public void searchUp(int TL_NO);

}
